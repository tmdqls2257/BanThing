import { useState } from 'react';
import styles from '../styles/SignUp.module.css';

interface propsType {
  signUpModal: boolean;
  setSignUpModal: Function;
}

export default function SignUp(prop: propsType) {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;
  const isKorean = /^[\가-\힣+]*$/;

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  return (
    <>
      <div className={styles.signup_modal}>
        <span
          className={styles.signup_times}
          onClick={() => prop.setSignUpModal(false)}
        >
          &times;
        </span>
        <div className={styles.signup_title}>
          Ban<span className={styles.black}>Thing</span>
        </div>
        <div className={styles.signup_id_name_container}>
          <input
            id="id"
            className={styles.signup_input_box_1}
            placeholder="아이디"
          />
          <button className={styles.signup_double_check_button}>
            중복확인
          </button>
        </div>
        <span className={styles.signup_error}>
          이미 사용중인 아이디입니다.
          {/* <div className={styles.signup_space}>_</div> */}
        </span>
        <div className={styles.signup_id_name_container}>
          <input className={styles.signup_input_box_1} placeholder="닉네임" />
          <button className={styles.signup_double_check_button}>
            중복확인
          </button>
        </div>
        <span className={styles.signup_error}>
          이미 사용중인 닉네임입니다.
          {/* <div className={styles.signup_space}>_</div> */}
        </span>
        <input
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 입력"
        />
        <span className={styles.signup_error}>
          4~10자 영문, 숫자를 사용하세요.
          {/* <div className={styles.signup_space}>_</div> */}
        </span>
        <input
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 확인"
        />
        <span className={styles.signup_error}>
          비밀번호가 일치하지 않습니다.
          {/* <div className={styles.signup_space}>_</div> */}
        </span>
        <button className={styles.signup_button}>
          <img
            src="/signup.png"
            alt="signup-icon"
            className={styles.signup_icon}
          />
          <span>회원가입</span>
        </button>
      </div>
    </>
  );
}
