import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import styles from '../../styles/main/Rate.module.css';

const Container = styled.div`
  display: flex;
  width: 100vw;
  position: fixed;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(2px);
  h1 {
    font-size: 1.5em;
    background-color: #0000000;
  }
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
interface makeRoomState {
  setMakeRoomModal: Dispatch<SetStateAction<boolean>>;
}

export default function MakeRoomModal({ setMakeRoomModal }: makeRoomState) {
  const onClick = () => {
    setMakeRoomModal(false);
  };
  return (
    <>
      <Container id="makeModal">
        <form className={styles.rate_modal}>
          <section className={styles.rate_title}>
            <h1 className={styles.rate_h1}>내용을 모두 입력해주세요</h1>
          </section>
          <button onClick={onClick}>확인</button>
        </form>
      </Container>
    </>
  );
}
