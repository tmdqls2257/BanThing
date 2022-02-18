import styled from 'styled-components'

export interface BasicButtonProp {
  children: string
  containerName: string
}

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()

  const button: HTMLButtonElement = event.currentTarget
  console.log(button.value)
}

function Button({ containerName, children }: BasicButtonProp) {
  return (
    <StyledButton>
      <button onClick={handleClick} value={containerName}>
        {children}
      </button>
    </StyledButton>
  )
}

const StyledButton = styled.div`
  button {
    margin: 0;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    padding: 12px 16px;
    border-radius: 50px;
    color: #ffffff;
    max-width: 181px;
    background-color: #ff8a3d;
  }
`

export default Button
