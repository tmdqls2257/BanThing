import styles from '../styles/Modal.module.css';

export default function Modal() {
  return (
    <>
      <div className={styles.change_password_modal_container}>
        <div className={styles.change_password_modal_body}>
          <div className={styles.change_password_modal_description}>
            <span>카카오 로그인을 하실 경우,</span>
            <span>이메일 제공에 반드시 동의해주셔야 합니다.</span>
          </div>
          <div className={styles.change_password_modal_button_container}>
            <button className={styles.change_password_modal_button}>
              알겠습니다
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
