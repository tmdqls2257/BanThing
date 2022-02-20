import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Login from './login';
import React, { useState } from 'react';

export default function NavBar() {
  const [loginModal, setLoginModal] = useState(false);

  const openLoginModal = () => {
    setLoginModal(true);
  };

  return (
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
          <Link href="/main">
            <a className={styles.nav_menu}>MAIN</a>
          </Link>
          <a className={styles.nav_menu} onClick={() => openLoginModal()}>
            LOGIN
          </a>
        </nav>
      </div>

      {loginModal ? (
        <Login loginModal={loginModal} setLoginModal={setLoginModal} />
      ) : (
        <></>
      )}
    </>
  );
}
