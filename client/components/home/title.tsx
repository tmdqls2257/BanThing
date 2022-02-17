import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { Fade, AttentionSeeker } from "react-awesome-reveal";

export default function Title() {
  return (
    <>
      <div className={styles.title}>
        <main className={styles.main}>
          <h1 className={styles.title_title}>
            <span className={styles.orange}>Ban</span>
            <span className={styles.black}>Thing</span>
          </h1>
          <div className={styles.title_description}>
            <span>부담을 </span>
            <span className={styles.orange}>나눠 </span>
            <span>드세요.</span>
          </div>
          <Link href="/main">
            <button className={styles.title_button}>
              <span>시작하기 </span>
            </button>
          </Link>
        </main>
        <div>
          <img
            src="/title.png"
            alt="title-image"
            className={styles.title_image}
          />
        </div>
      </div>
    </>
  );
}
