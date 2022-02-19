import styles from '../../styles/Home.module.css';

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.team_title}>TEAM MEMBERS</div>
        <div className={styles.team_members}>
          <a
            href="https://github.com/shren207"
            target="_blank"
            className={styles.member}
          >
            <div className={styles.member_name}>윤녹두</div>
            <div className={styles.member_position}>- FULL STACK -</div>
          </a>
          <a
            href="https://github.com/forcoding97"
            target="_blank"
            className={styles.member}
          >
            <div className={styles.member_name}>정윤석</div>
            <div className={styles.member_position}>- FRONT END -</div>
          </a>
          <a
            href="https://github.com/tmdqls2257"
            target="_blank"
            className={styles.member}
          >
            <div className={styles.member_name}>홍승빈</div>
            <div className={styles.member_position}>- FRONT END -</div>
          </a>
          <a
            href="https://github.com/minho0513"
            target="_blank"
            className={styles.member}
          >
            <div className={styles.member_name}>이민호</div>
            <div className={styles.member_position}>- BACK END -</div>
          </a>
        </div>
        <div className={styles.copyright}>Copyright©2022 GAJA</div>
      </div>
    </>
  );
}
