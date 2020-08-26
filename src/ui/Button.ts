import styled from 'styled-components'

const Button = styled.button`
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  border: ${props => props.theme.border};
  background-color: ${props => props.theme.isDarkMode ? '#246' : 'white'};
  color: ${props => props.theme.isDarkMode ? 'white' : ''};
  font-weight: normal;
`

export default Button
