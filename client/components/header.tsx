import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Login from './login';
import React, { useState } from 'react';
import axios from 'axios';

interface propsType {
  isLogin: boolean;
  setIsLogin: Function;
  accessToken: string;
  setAccessToken: Function;
  auth: string;
  setAuth: Function;
}

export default function Header(prop: propsType) {
  const [loginModal, setLoginModal] = useState(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const handleLogout = () => {
    if (prop.auth === 'banthing') {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${prop.accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        )
        .then((response) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('auth');
          prop.setAccessToken('');
          prop.setIsLogin(false);
        });
    } else {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/kakaoLogOut`,
          { token: `${prop.accessToken}` },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('auth');
          prop.setAccessToken('');
          prop.setIsLogin(false);
        });
    }
  };

  return (
    <>
      {prop.isLogin ? (
        <div className={styles.header}>
          <Link href="/main">
            <a className={styles.logo}>
              <img src="/banthing.svg" alt="BanThing Logo" />
            </a>
          </Link>

          <nav className={styles.nav}>
            <Link href="/">
              <a className={styles.nav_menu}>HOME</a>
            </Link>
            <span className={styles.nav_divide}>|</span>
            <Link href="/main">
              <a className={styles.nav_menu}>MAIN</a>
            </Link>
            <span className={styles.nav_divide}>|</span>
            <Link href="/">
              <a className={styles.nav_menu} onClick={handleLogout}>
                LOGOUT
              </a>
            </Link>
          </nav>
          <div className={styles.nav_user_image_container}>
            <Link href="/mypage">
              <img
                src="/user.png"
                alt="user-image"
                className={styles.nav_user_image}
              />
            </Link>
          </div>
        </div>
      ) : (
        // ----------- ▲ 로그인이 되어있는 경우 -----------
        // --------- ▼ 로그인이 되어있지 않은 경우 ---------
        <>
          <div className={styles.header}>
            <Link href="/main">
              <a className={styles.logo}>
                <img src="/banthing.svg" alt="BanThing Logo" />
              </a>
            </Link>

            <nav className={styles.nav}>
              <Link href="/">
                <a className={styles.nav_menu}>HOME</a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <Link href="/main">
                <a className={styles.nav_menu}>MAIN</a>
              </Link>
              <span className={styles.nav_divide}>|</span>
              <a className={styles.nav_menu} onClick={openLoginModal}>
                LOGIN
              </a>
            </nav>
          </div>
          {loginModal ? (
            <Login
              loginModal={loginModal}
              setLoginModal={setLoginModal}
              setIsLogin={prop.setIsLogin}
              setAccessToken={prop.setAccessToken}
              auth={prop.auth}
              setAuth={prop.setAuth}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
