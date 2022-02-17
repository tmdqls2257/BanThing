import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { Fade, AttentionSeeker, Flip } from "react-awesome-reveal";

export default function Title() {
  return (
    <>
      <div className={styles.title}>
        <main className={styles.main}>
          <AttentionSeeker duration={1000} triggerOnce={true}>
            <h1 className={styles.title_title}>
              <span className={styles.orange}>Ban</span>
              <span className={styles.black}>Thing</span>
            </h1>
          </AttentionSeeker>
          <Fade delay={1300} triggerOnce={true}>
            <div className={styles.title_description}>
              <span>부담을 </span>
              <span className={styles.orange}>나눠 </span>
              <span>드세요.</span>
            </div>
          </Fade>
          <Fade delay={1900} triggerOnce={true}>
            <Link href="/main">
              <button className={styles.title_button}>
                <span>시작하기 </span>
              </button>
            </Link>
          </Fade>
        </main>
        <div className={styles.title_image_container}>
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
