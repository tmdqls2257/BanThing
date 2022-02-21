import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Login from './login';
import React, { useState } from 'react';

export default function NavBar() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginModal, setLoginModal] = useState(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };

  const handleLogOut = () => {};

  return (
    <>
      {isLogin ? (
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
            <a className={styles.nav_menu} onClick={() => handleLogOut()}>
              LOGOUT
            </a>
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
            <a className={styles.nav_menu} onClick={() => openLoginModal()}>
              LOGIN
            </a>
          </nav>

          {loginModal ? (
            <Login loginModal={loginModal} setLoginModal={setLoginModal} />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
