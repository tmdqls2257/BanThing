import styled from 'styled-components'

interface buttonType {
  disabled?: boolean
  children: string
}

function Button({ disabled, children }: buttonType) {
  return <StyledButton disabled={disabled}>{children}</StyledButton>
}

const StyledButton = styled.button`
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  padding: 12px 16px;
  border-radius: 50px;
  color: #ffffff;
  width: 181px;
  background-color: #ff8a3d;
`

export default Button
