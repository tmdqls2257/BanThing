import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Login from './login';
import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
interface propsType {
  isLogin: boolean;
  setIsLogin: Function;
}

export default function Header(prop: propsType) {
  const [loginModal, setLoginModal] = useState(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };

  let cookie: string;
  let accessToken: string;

  const handleLogout = () => {
    if (typeof document !== 'undefined') {
      cookie = document.cookie;

      if (cookie.includes(';') && cookie.includes('accessToken')) {
        const cookieList = cookie.split(';');
        const findAccessToken = cookieList.filter((cookie: string) => {
          return cookie.includes('accessToken');
        });
        accessToken = findAccessToken[0].split('=')[1];
      } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
        accessToken = cookie.split('=')[1];
      }

      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          prop.setIsLogin(false);
        })
        .catch((error) => {
          console.log(error);
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
            />
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
