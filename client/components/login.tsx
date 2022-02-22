import styles from '../styles/Login.module.css';
import SignUp from './signup';
import React, { useState } from 'react';
import axios from 'axios';
import { ChangeEvent } from 'react';
interface propsType {
  loginModal: boolean;
  setLoginModal: Function;
  setIsLogin: Function;
  setAccessToken: Function;
}

export default function Login(prop: propsType) {
  const [signUpModal, setSignUpModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const [loginMessage, setLoginMessage] = useState('');

  const openSignUpModal = () => {
    setSignUpModal(true);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    if (userId === '' || password === '') {
      setLoginMessage('아이디와 비밀번호를 모두 입력해주세요.');
    } else {
      axios
        .post(`http://${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/login`, {
          user_id: userId,
          password: password,
        })
        .then((response) => {
          const { accessToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          prop.setAccessToken(accessToken);
          prop.setIsLogin(true);
          prop.setLoginModal(false);
        })
        .catch((error) => {
          if (error)
            setLoginMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
        });
    }
  };

  return (
    <>
      <div className={styles.login_container}>
        <div className={styles.login_modal}>
          <span
            className={styles.login_times}
            onClick={() => prop.setLoginModal(false)}
          >
            &times;
          </span>
          <div className={styles.login_title}>
            Ban<span className={styles.black}>Thing</span>
          </div>
          <input
            className={styles.login_input_box}
            placeholder="아이디"
            onChange={handleUserId}
          ></input>
          <input
            className={styles.login_input_box}
            type="password"
            placeholder="비밀번호"
            onChange={handlePassword}
          ></input>
          <span className={styles.login_error}>{loginMessage}</span>
          <button className={styles.login_button} onClick={handleLogin}>
            <img
              src="/login.png"
              alt="login-icon"
              className={styles.login_icon}
            />
            <span>로그인</span>
          </button>

          <button className={styles.login_kakao_button}>
            <div>
              <img
                src="/kakao.png"
                alt="kakao-logo"
                className={styles.login_kakao_logo}
              />
              <span>로그인</span>
            </div>
          </button>

          <div className={styles.login_description}>
            계정이 없으신가요?{' '}
            <span
              className={styles.login_signup}
              onClick={() => openSignUpModal()}
            >
              회원가입 하기
            </span>
          </div>
        </div>

        {signUpModal ? (
          <>
            <SignUp signUpModal={signUpModal} setSignUpModal={setSignUpModal} />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
