import styles from '../../styles/Home.module.css';
import { Bounce } from 'react-awesome-reveal';

export default function Text() {
  return (
    <>
      <Bounce triggerOnce={true} delay={300} duration={800}>
        <div className={styles.text_container}>
          <div>배달메이트와 함께 주문하여</div>
          <div>배달음식에 대한 부담을 줄여보세요!</div>
        </div>
      </Bounce>
    </>
  );
}
