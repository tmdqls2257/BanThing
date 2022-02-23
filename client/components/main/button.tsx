import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { BasicButtonProp } from '../type';

function Button({
  onClick,
  rateNum,
  containerName,
  children,
  setChats,
  roomId,
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
      if (onClick) {
        try {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          };
          axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post`,
            {
              title: onClick[0],
              category: onClick[1],
              content: onClick[2],
              host_role: onClick[3],
              location_latitude: onClick[4],
              location_longitude: onClick[5],
            },
            {
              headers,
            },
          );
        } catch (e) {
          console.log(e);
        }
      }
      makeRoom.style.display = 'none';
      chatRoom.style.display = 'flex';
    } else if (button.value === '나가기') {
      chatRoom.style.display = 'none';
      createElement.style.display = 'flex';
    } else if (button.value === 'JoinRoom') {
      console.log(roomId);
      const getPosts = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          };
          const response: AxiosResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply/${roomId}`,
            {
              headers,
            },
          );
          setChats(response.data);
          console.log(response.data);
        } catch (e) {
          console.log(e);
        }
      };
      getPosts();
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
