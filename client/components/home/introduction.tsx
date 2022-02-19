import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { Zoom, Fade, Slide } from 'react-awesome-reveal';

interface propsType {
  imagePosition: string;
  image: string;
  title: string;
  description: Array<string>;
}

export default function Introduction(props: propsType): JSX.Element {
  if (props.imagePosition === 'left') {
    return (
      <>
        <div className={styles.introduction_container_right}>
          <Zoom triggerOnce={true} duration={2000}>
            <div>
              <img
                src={props.image}
                alt="title-image"
                className={styles.introduction_image}
              />
            </div>
          </Zoom>

          <main className={styles.introduction_main_right}>
            <Slide triggerOnce={true} delay={150} direction={'right'}>
              <div className={styles.introduction_title_right}>
                <span className={styles.orange}>{props.title}</span>
              </div>
            </Slide>
            <Fade triggerOnce={true} delay={1100}>
              <div className={styles.introduction_description_right}>
                {props.description.map((list, index) => {
                  return <div key={index}>{list}</div>;
                })}
              </div>
            </Fade>
          </main>
        </div>
      </>
    );
  } else if (props.imagePosition === 'right') {
    return (
      <>
        <div className={styles.introduction_container_left}>
          <main className={styles.introduction_main_left}>
            <Slide triggerOnce={true} delay={150} direction={'left'}>
              <div className={styles.introduction_title_left}>
                <span className={styles.orange}>{props.title}</span>
              </div>
            </Slide>
            <Fade triggerOnce={true} delay={1100}>
              <div className={styles.introduction_description_left}>
                {props.description.map((list, index) => {
                  return <div key={index}>{list}</div>;
                })}
              </div>
            </Fade>
          </main>

          <Zoom triggerOnce={true} duration={2000}>
            <div>
              <img
                src={props.image}
                alt="title-image"
                className={styles.introduction_image}
              />
            </div>
          </Zoom>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
