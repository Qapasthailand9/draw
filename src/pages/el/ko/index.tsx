import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  memo,
} from 'react'

import {
  range,
  random,
  shuffle,
} from 'lodash'

import type { FixedArray } from 'model/types'

import Team from 'model/team/KnockoutTeam'
import getPossiblePairings from 'engine/predicates/uefa/getPossiblePairings'
import getPredicate from 'engine/predicates/uefa/ko'

import useDrawId from 'store/useDrawId'
import useFastDraw from 'store/useFastDraw'
import useXRay from 'store/useXRay'

import useMatchMedia from 'utils/hooks/useMatchMedia'

import PotsContainer from 'ui/PotsContainer'
// import AirborneContainer from 'ui/AirborneContainer'
import MatchupsContainer from 'ui/MatchupsContainer'
import TablesContainer from 'ui/TablesContainer'
import BowlsContainer from 'ui/BowlsContainer'
import TeamBowl from 'ui/bowls/TeamBowl'
import Separator from 'ui/Separator'
import Announcement from 'ui/Announcement'

import Root from 'pages/Root'

interface Props {
  season: number,
  pots: FixedArray<FixedArray<Team, 16>, 2>,
}

interface State {
  currentMatchupNum: number,
  currentPotNum: number,
  possiblePairings: readonly number[] | null,
  pots: readonly Team[][],
  matchups: readonly [Team, Team][],
}

function getState(initialPots: readonly (readonly Team[])[]): State {
  const currentPotNum = 1
  const currentMatchupNum = 0
  return {
    currentMatchupNum,
    currentPotNum,
    possiblePairings: null,
    pots: initialPots.map(pot => shuffle(pot)),
    matchups: range(16).map(() => [] as any),
  }
}

const ELKO = ({
  season,
  pots: initialPots,
}: Props) => {
  const [drawId, setNewDrawId] = useDrawId()
  const [isFastDraw, setIsFastDraw] = useFastDraw()

  const predicate = useMemo(() => getPredicate(season), [season])

  const [{
    currentMatchupNum,
    currentPotNum,
    possiblePairings,
    pots,
    matchups,
  }, setState] = useState(() => getState(initialPots))

  useEffect(() => {
    setState(getState(initialPots))
  }, [initialPots, drawId])

  const isTallScreen = useMatchMedia('(min-height: 750px)')
  const [isXRay] = useXRay()

  const groupsContanerRef = useRef<HTMLElement>(null)

  const onBallPick = useCallback((i: number) => {
    const currentPot = pots[currentPotNum]
    const index = possiblePairings ? possiblePairings[i] : i
    const selectedTeam = currentPot[index]

    const newPots = pots.slice()
    newPots[currentPotNum] = newPots[currentPotNum].filter((_, idx) => idx !== index)

    const newMatchups = matchups.slice()
    // @ts-ignore
    newMatchups[currentMatchupNum] = [
      ...newMatchups[currentMatchupNum],
      selectedTeam,
    ]

    const newPossiblePairings = currentPotNum === 1
      ? getPossiblePairings(newPots, newMatchups, predicate)
      : null

    const newCurrentMatchNum = currentMatchupNum - currentPotNum + 1

    setState({
      currentPotNum: 1 - currentPotNum,
      currentMatchupNum: newCurrentMatchNum,
      possiblePairings: newPossiblePairings,
      pots: newPots,
      matchups: newMatchups,
    })
  }, [predicate, pots, matchups, currentPotNum, currentMatchupNum, possiblePairings])

  const autoPickIfOneBall = () => {
    if (isFastDraw) {
      return
    }
    const isOnlyChoice = possiblePairings?.length === 1
      || currentPotNum === 1 && pots[1].length === 1
    if (isOnlyChoice) {
      onBallPick(0)
    }
  }

  useEffect(() => {
    setTimeout(autoPickIfOneBall, 250)
  }, [currentPotNum])

  const teamBowlPot = useMemo(
    () => possiblePairings && pots[0].filter((team, i) => possiblePairings.includes(i)),
    [possiblePairings],
  )

  const completed = currentMatchupNum >= initialPots[0].length

  useEffect(() => {
    if (isFastDraw) {
      const teams = teamBowlPot ?? pots[1]
      const numTeams = teams.length
      if (numTeams > 0) {
        const index = random(numTeams - 1)
        onBallPick(index)
      }
    }
  }, [isFastDraw, currentPotNum])

  useEffect(() => {
    if (completed && isFastDraw) {
      setIsFastDraw(false)
    }
  }, [completed, isFastDraw])

  const selectedTeams = possiblePairings ? possiblePairings.map(i => pots[0][i]) : []

  return (
    <Root>
      <TablesContainer>
        <PotsContainer
          selectedTeams={selectedTeams}
          initialPots={initialPots}
          pots={pots}
          currentPotNum={currentPotNum}
          split={!isTallScreen}
        />
        <MatchupsContainer
          ref={groupsContanerRef}
          matchups={matchups}
        />
      </TablesContainer>
      <BowlsContainer>
        {!isFastDraw && (
          <>
            {!completed && (
              <Separator>Runners-up</Separator>
            )}
            <TeamBowl
              forceNoSelect={currentPotNum === 0}
              display={!completed}
              displayTeams={isXRay}
              selectedTeam={null}
              pot={pots[1]}
              onPick={onBallPick}
            />
            {!completed && (
              <Separator>Group Winners</Separator>
            )}
            {teamBowlPot && (
              <TeamBowl
                forceNoSelect={currentPotNum === 1}
                display={!completed}
                displayTeams={isXRay}
                selectedTeam={null}
                pot={teamBowlPot}
                onPick={onBallPick}
              />
            )}
          </>
        )}
        {completed && (
          <Announcement
            long={false}
            completed={completed}
            selectedTeam={null}
            pickedGroup={null}
            possibleGroups={null}
            numGroups={0}
            groupsElement={groupsContanerRef}
            reset={setNewDrawId}
          />
        )}
      </BowlsContainer>
    </Root>
  )
}

export default memo(ELKO)
