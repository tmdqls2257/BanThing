import React from 'react';
import { useState } from 'react';
import styles from '../styles/SignUp.module.css';

interface propsType {
  signUpModal: boolean;
  setSignUpModal: Function;
}

export default function SignUp(prop: propsType) {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;
  const isRightNickname = /^[가-힣a-zA-Z0-9]{3,8}$/;

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [correctUserId, setCorrectUserId] = useState(true);
  const [correctNickname, setCorrectNickname] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  const [correctCheckPassword, setCorrectCheckPassword] = useState(true);

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'id') {
      if (!value) {
        setCorrectUserId(true);
      } else if (isSmallLetterAndNumber4to10.test(value)) {
        setCorrectUserId(true);
      } else {
        setCorrectUserId(false);
      }
    }

    if (type === 'nickname') {
      if (!value) {
        setCorrectNickname(true);
      } else if (isRightNickname.test(value)) {
        setCorrectNickname(true);
      } else {
        setCorrectNickname(false);
      }
    }

    if (type === 'password') {
      if (!value) {
        setCorrectPassword(true);
      } else if (isSmallLetterAndNumber4to10.test(value)) {
        setCorrectPassword(true);
      } else {
        setCorrectPassword(false);
      }
    }

    if (type === 'check_password') {
      if (!value || !correctPassword || password === '') {
        setCorrectCheckPassword(true);
      } else if (password === checkPassword) {
        setCorrectCheckPassword(true);
      } else {
        setCorrectCheckPassword(false);
      }
    }
  };

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
            onChange={handleUserId}
            onBlur={handleBlur}
          />
          <button className={styles.signup_double_check_button}>
            중복확인
          </button>
        </div>
        {correctUserId ? (
          <div className={styles.signup_space}>
            4~10자 영어 소문자, 숫자를 사용했습니다.
          </div>
        ) : (
          <span className={styles.signup_error}>
            4~10자 영어 소문자, 숫자를 사용하세요.
          </span>
        )}
        <div className={styles.signup_id_name_container}>
          <input
            id="nickname"
            className={styles.signup_input_box_1}
            placeholder="닉네임"
            onChange={handleNickname}
            onBlur={handleBlur}
          />
          <button className={styles.signup_double_check_button}>
            중복확인
          </button>
        </div>
        {correctNickname ? (
          <div className={styles.signup_space}>
            3~8자 한글, 영문, 숫자를 사용했습니다.
          </div>
        ) : (
          <span className={styles.signup_error}>
            3~8자 한글, 영문, 숫자를 사용하세요.
          </span>
        )}
        <input
          id="password"
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 입력"
          onChange={handlePassword}
          onBlur={handleBlur}
        />
        {correctPassword ? (
          <div className={styles.signup_space}>
            4~10자 영어 소문자, 숫자를 사용했습니다.
          </div>
        ) : (
          <span className={styles.signup_error}>
            4~10자 영어 소문자, 숫자를 사용하세요.
          </span>
        )}
        <input
          id="check_password"
          type="password"
          className={styles.signup_input_box_2}
          placeholder="비밀번호 확인"
          onChange={handleCheckPassword}
          onBlur={handleBlur}
        />
        {correctCheckPassword ? (
          <div className={styles.signup_space}>비밀번호가 일치합니다.</div>
        ) : (
          <span className={styles.signup_error}>
            비밀번호가 일치하지 않습니다.
          </span>
        )}
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
