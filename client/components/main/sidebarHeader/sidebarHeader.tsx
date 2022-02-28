import styles from './sideBarHeader.module.css';

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
    <div className={styles.container}>
      <button
        className={styles.container_button}
        onClick={handleClick}
        value={containerName}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <div className={styles.container_container}>
        <h2 className={styles.container_container_h1}>{children}</h2>
      </div>
    </div>
  );
};

export default SidebarHeader;
