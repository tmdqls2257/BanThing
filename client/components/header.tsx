import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function NavBar() {
  return (
    <>
      <div className={styles.header}>
        <Link href="/main">
          <a className={styles.logo}>LOGO</a>
        </Link>

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
        </ul>

        {/* <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.nav_menu}>HOME</a>
          </Link>
          <a className={styles.nav_menu}>|</a>
          <Link href="main">
            <a className={styles.nav_menu}>MAIN</a>
          </Link>
        </nav> */}
      </div>
    </>
  );
}
