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

  const [idMessage, setIdMessage] = useState('');
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectUserId(true);
    setUserId(event.target.value);
  };

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectNickname(true);
    setNickname(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectPassword(true);
    setPassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectCheckPassword(true);
    setCheckPassword(event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'id') {
      if (!value) {
        setIdMessage('필수 정보입니다.');
        setCorrectUserId(false);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setIdMessage('4~10자 영어 소문자, 숫자를 사용하세요.');
        setCorrectUserId(false);
      } else {
        setCorrectUserId(true);
      }
    }

    if (type === 'nickname') {
      if (!value) {
        setNicknameMessage('필수 정보입니다.');
        setCorrectNickname(false);
      } else if (!isRightNickname.test(value)) {
        setNicknameMessage('3~8자 한글, 영문, 숫자를 사용하세요.');
        setCorrectNickname(false);
      } else {
        setCorrectNickname(true);
      }
    }

    if (type === 'password') {
      if (!value) {
        setPasswordMessage('필수 정보입니다.');
        setCorrectPassword(false);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setPasswordMessage('4~10자 영어 소문자, 숫자를 사용하세요.');
        setCorrectPassword(false);
      } else {
        setCorrectPassword(true);
      }
    }

    if (type === 'check_password') {
      if (!value) {
        setCheckPasswordMessage('필수 정보입니다.');
        setCorrectCheckPassword(false);
      } else if (password !== checkPassword) {
        if (password === '' || !correctPassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCheckPasswordMessage('비밀번호가 일치하지 않습니다.');
          setCorrectCheckPassword(false);
        }
      } else if (password === checkPassword) {
        if (!correctPassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCorrectCheckPassword(true);
        }
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
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{idMessage}</span>
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
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{nicknameMessage}</span>
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
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{passwordMessage}</span>
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
          <div className={styles.signup_space}>올바르게 작성되었습니다.</div>
        ) : (
          <span className={styles.signup_error}>{checkPasswordMessage}</span>
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
