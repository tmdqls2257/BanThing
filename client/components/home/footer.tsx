import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function NavBar() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.team_title}>TEAM MEMBERS</div>
        <div className={styles.team_members}>
          <span className={styles.member}>
            <div className={styles.member_name}>윤녹두</div>
            <div className={styles.member_position}>- FULL STACK -</div>
          </span>
          <span className={styles.member}>
            <div className={styles.member_name}>정윤석</div>
            <div className={styles.member_position}>- FRONT END -</div>
          </span>
          <span className={styles.member}>
            <div className={styles.member_name}>홍승빈</div>
            <div className={styles.member_position}>- FRONT END -</div>
          </span>
          <span className={styles.member}>
            <div className={styles.member_name}>이민호</div>
            <div className={styles.member_position}>- BACK END -</div>
          </span>
        </div>
        <div className={styles.copyright}>Copyright©2022 GAJA</div>
      </div>
    </>
  );
}
