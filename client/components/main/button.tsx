import styled from 'styled-components';
import { BasicButtonProp } from '../type';

function Button({
  onClick,
  rateNum,
  containerName,
  children,
}: BasicButtonProp) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    const rate = document.querySelector('#rate')! as HTMLElement;

    if (button.value === 'CreateRoom') {
      createElement.style.display = 'none';
      makeRoom.style.display = 'flex';
    } else if (button.value === 'MakeRoom') {
      console.log(onClick);
      makeRoom.style.display = 'none';
      chatRoom.style.display = 'flex';
    } else if (button.value === '나가기') {
      chatRoom.style.display = 'none';
      createElement.style.display = 'flex';
    } else if (button.value === 'JoinRoom') {
      joinRoom.style.display = 'none';
      chatRoom.style.display = 'flex';
    } else if (button.value === '평가하기') {
      console.log(rateNum);

      chatRoom.style.display = 'none';
      rate.style.display = 'none';
      createElement.style.display = 'flex';
    } else if (button.value === '합의완료') {
      rate.style.display = 'flex';
    }
  };
  return (
    <StyledButton>
      <button onClick={handleClick} value={containerName}>
        {children}
      </button>
    </StyledButton>
  );
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
    border-radius: 6px;
    color: #ffffff;
    width: 181px;
    background-color: #ff8a3d;
    @media screen and (max-width: 768px) {
      width: 10rem;
    }
  }
`;

export default Button;
