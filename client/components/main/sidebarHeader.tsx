import styled from 'styled-components';
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 32px;
  margin: var(--margine-base) 0;
  div {
    display: flex;
    text-align: center;
  }
  h1 {
    font-size: var(--font-size-base);
    margin: auto;
  }

  button {
    font-size: var(--font-size-base);
    size: var(--font-size-base);
    background-color: var(--white-color);
    border: none;
    position: absolute;
    top: 30%;
    left: 16px;
  }
  button:hover {
    cursor: pointer;
  }
`;

type SidebarHeaderType = {
  children: string;
  containerName: string;
};

const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();

  const button: HTMLButtonElement = event.currentTarget;
  const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
  const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
  const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
  const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
  if (button.value === 'gotoJoinRoom') {
    joinRoom.style.display = 'flex';
    chatRoom.style.display = 'none';
  } else if (button.value === 'gotoCreateRoom') {
    createElement.style.display = 'flex';
    makeRoom.style.display = 'none';
  }
};

const SidebarHeader = ({ containerName, children }: SidebarHeaderType) => {
  return (
    <Header>
      <button onClick={handleClick} value={containerName}>
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <div>
        <h1>{children}</h1>
      </div>
    </Header>
  );
};

export default SidebarHeader;
