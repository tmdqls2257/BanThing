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
export default function RemoveModal() {
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Container id="rate">
        <form className={styles.rate_modal} onSubmit={onSubmit}>
          <section className={styles.rate_title}>
            <h1>정말 삭제하시겠습니까?</h1>
          </section>

          <Button containerName={'removeModal'}>삭제하기</Button>
        </form>
      </Container>
    </>
  );
}
