<<<<<<< HEAD
import Link from 'next/link'
import styles from '../styles/Home.module.css'
=======
import Link from 'next/link';
import styles from '../styles/Home.module.css';
>>>>>>> 46b3f07e5c3d32d052f19fb4141510dc693707ca

export default function NavBar() {
  return (
    <>
      <div className={styles.header}>
        <Link href="/main">
          <a className={styles.logo}>
            <img src="banthing.svg" alt="BanThing Logo" />
          </a>
        </Link>

        <nav className={styles.nav}>
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
  );
}
