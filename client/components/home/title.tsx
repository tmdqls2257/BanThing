import Link from "next/link";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
import { Zoom, Fade } from "react-awesome-reveal";

export const Container = styled.div`
  width: 89vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export default function Title() {
  return (
    <>
      <Container>
        <main className={styles.main}>
          <Zoom triggerOnce={true}>
            <div className={styles.title_title}>
              <span className={styles.orange}>Ban</span>
              <span className={styles.black}>Thing</span>
            </div>
          </Zoom>
          <Fade triggerOnce={true} delay={1000}>
            <div className={styles.title_description}>
              <span>부담을 </span>
              <span className={styles.orange}>나눠 </span>
              <span>드세요.</span>
            </div>
          </Fade>
          <Fade triggerOnce={true} delay={2000}>
            <Link href="/main">
              <button className={styles.title_button}>
                <span>시작하기 </span>
              </button>
            </Link>
          </Fade>
        </main>
        <Fade triggerOnce={true} duration={1200}>
          <div className={styles.title_image_container}>
            <img
              src="/title.png"
              alt="title-image"
              className={styles.title_image}
            />
          </div>
        </Fade>
      </Container>
    </>
  );
}
