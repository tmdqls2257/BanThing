import axios from 'axios';
import styled from 'styled-components';
import styles from '../../styles/main/Rate.module.css';

const Container = styled.div`
  display: none;
  width: 100vw;
  position: fixed;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(2px);
  button {
    margin: 0 auto;
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
interface removeRoomId {
  removeRoomId: number;
}

export default function RemoveModal({ removeRoomId }: removeRoomId) {
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };
  const onClick = () => {
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;

    chatRoom.style.display = 'none';
    removeModal.style.display = 'none';
    createElement.style.display = 'flex';
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      };
      axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/deletePost/${removeRoomId}`,
        {
          headers,
        },
      );
    }
  };
  return (
    <>
      <Container id="removeModal">
        <form className={styles.rate_modal} onSubmit={onSubmit}>
          <section className={styles.rate_title}>
            <h1>정말 삭제하시겠습니까?</h1>
          </section>
          <button onClick={onClick}>삭제하기</button>
        </form>
      </Container>
    </>
  );
}
