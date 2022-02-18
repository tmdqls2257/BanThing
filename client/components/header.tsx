<<<<<<< HEAD
import Link from "next/link";
import styles from "../styles/Home.module.css";
import logo from "../public/banthing.svg";
=======
import Link from 'next/link'
import styles from '../styles/Home.module.css'
>>>>>>> d5a07517e4c42a9f4ff0ea8e867fa8adfae5d9cc

export default function NavBar() {
  return (
    <>
      <div className={styles.header}>
        <Link href="/main">
          <a className={styles.logo}>
            <img src="banthing.svg" alt="BanThing Logo" />
          </a>
        </Link>
<<<<<<< HEAD

        <nav className={styles.nav}>
=======
        <ul className={styles.nav}>
          <li>
            <Link href="/">
              <a className={styles.nav_menu}>HOME</a>
            </Link>
          </li>
          <li>
            <Link href="/main">
              <a className={styles.nav_menu}>MAIN</a>
            </Link>
          </li>
          <li>
            <a className={styles.nav_menu}>LOGIN</a>
          </li>
        </ul>

        {/* <nav className={styles.nav}>
>>>>>>> d5a07517e4c42a9f4ff0ea8e867fa8adfae5d9cc
          <Link href="/">
            <a className={styles.nav_menu}>HOME</a>
          </Link>
          <Link href="/main">
            <a className={styles.nav_menu}>MAIN</a>
          </Link>
          <a className={styles.nav_menu}>LOGIN</a>
        </nav>
      </div>
    </>
  )
}
