import styled from 'styled-components';
import styles from '../../styles/main/Rate.module.css';
import Button from './button';
import RateButton from './rateButton';
const Container = styled.div`
  display: none;
  width: 100vw;
  position: fixed;
  right: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
  backdrop-filter: blur(2px);
`;
export default function Rate() {
  return (
    <>
      <Container id="rate">
        <div className={styles.rate_modal}>
          <section className={styles.rate_title}>
            <h1>
              함께 주문한 배달메이트,
              <br /> 어떠셨나요?
            </h1>
            <p className={styles.rate_p}>
              (평가된 점수는 상대방의 평점에 반영됩니다)
            </p>
          </section>
          <section className={styles.rate_button}>
            <RateButton containerName={1}>1</RateButton>
            <RateButton containerName={2}>2</RateButton>
            <RateButton containerName={3}>3</RateButton>
            <RateButton containerName={4}>4</RateButton>
            <RateButton containerName={5}>5</RateButton>
            <RateButton containerName={6}>6</RateButton>
            <RateButton containerName={7}>7</RateButton>
            <RateButton containerName={8}>8</RateButton>
            <RateButton containerName={9}>9</RateButton>
            <RateButton containerName={10}>10</RateButton>
          </section>
          <Button containerName={'평가하기'}>평가하기</Button>
        </div>
      </Container>
    </>
  );
}
