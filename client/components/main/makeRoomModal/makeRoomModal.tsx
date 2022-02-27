import { Dispatch, SetStateAction } from 'react';
import styles from '../../../styles/main/Rate.module.css';
import buttonStyle from '../button.module.css';

interface makeRoomState {
  setMakeRoomModal: Dispatch<SetStateAction<boolean>>;
}

export default function MakeRoomModal({ setMakeRoomModal }: makeRoomState) {
  const onClick = () => {
    setMakeRoomModal(false);
  };
  return (
    <>
      <section className={styles.makeRoomModal__section} id="makeModal">
        <form className={styles.rate_modal}>
          <section className={styles.rate_title}>
            <h1 className={styles.rate_h1}>내용을 모두 입력해주세요</h1>
          </section>

          <section className={buttonStyle.button_container}>
            <button className={buttonStyle.button} onClick={onClick}>
              확인
            </button>
          </section>
        </form>
      </section>
    </>
  );
}
