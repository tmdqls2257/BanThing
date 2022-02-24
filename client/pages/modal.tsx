import styles from '../styles/Modal.module.css';

export default function Modal() {
  return (
    <>
      <div className={styles.change_password_modal_container}>
        <div className={styles.change_password_modal_body}>
          <div className={styles.change_password_modal_description}>
            <span>비밀번호가 변경되었습니다.</span>
          </div>
          <div className={styles.change_password_modal_button_container}>
            <button className={styles.change_password_modal_button}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
