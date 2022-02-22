import { useState } from 'react';
import styled from 'styled-components';
import styles from '../../styles/main/Rate.module.css';
import Button from './button';
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
  const [rateNum, setRateNum] = useState<number>(0);
  const rendering = () => {
    const result = [];
    for (let i = 1; i < 11; i++) {
      result.push(
        <button
          onClick={onClick}
          value={i}
          className={styles.rate_button_number}
          key={i}
        >
          {i}
        </button>,
      );
    }
    return result;
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const button = event.currentTarget;
    setRateNum(Number(button.value));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(rateNum);
  };

  return (
    <>
      <Container id="rate">
        <form className={styles.rate_modal} onSubmit={onSubmit}>
          <section className={styles.rate_title}>
            <h1>
              함께 주문한 배달메이트,
              <br /> 어떠셨나요?
            </h1>
            <p className={styles.rate_p}>
              (평가된 점수는 상대방의 평점에 반영됩니다)
            </p>
          </section>
          <section className={styles.rate_button}>{rendering()}</section>
          <Button rateNum={rateNum} containerName={'평가하기'}>
            평가하기
          </Button>
        </form>
      </Container>
    </>
  );
}
