import { memoize } from 'lodash'

import fetchPots from 'model/fetchPotsData'
import getPairings from 'model/getPairings'
import parseGS from 'model/parsePotsData/gs'
import parseKo from 'model/parsePotsData/ko'

async function getPotsFromBert(tournament: string, stage: string, season: number) {
  const fetchPotsPromise = fetchPots(tournament, season)
  const pairings = await getPairings(season, tournament)
  const data = await fetchPotsPromise

  return stage === 'ko'
    ? parseKo(data)
    : parseGS(data, pairings)
}

const resolver = (tournament, stage, season) =>
  `${tournament}:${stage}:${season}`

export default memoize(getPotsFromBert, resolver)
