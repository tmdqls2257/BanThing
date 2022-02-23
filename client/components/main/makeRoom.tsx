import SidebarHeader from './sidebarHeader';
import styled from 'styled-components';
import { setStateType } from '../type';
import Button from './button';
import { useState } from 'react';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  width: 30vw;
  min-width: 400px;
  min-height: 715px;

  height: auto;
  main {
    display: flex;
    flex-direction: column;
    width: 332px;

    justify-content: space-between;
    margin: auto;
  }
  .MakeRoom-main-section-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    input,
    select {
      display: flex;
      width: 200px;
      font-size: var(--font-size-base);
    }
  }
  .MakeRoom-main-section-radio {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-direction: flex-start;
    input {
      margin-right: var(--margine-base);
    }
  }
  .MakeRoom-main-section-content {
    padding: 32px;
    line-height: 1.5;
    display: flex;
    border: none;
    border-radius: var(--border-radius-base);
    background-color: var(--gary-color);
    width: var(--sidebar-content-width);
    height: 30vh;
    ::-webkit-scrollbar {
      width: 0;
    }
  }
  textarea:focus,
  input,
  select {
    outline: none;
  }
  h1 {
    font-size: 1rem;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
  margin: var(--margine-base) auto;
  div {
    margin: var(--margine-small);
  }
  button {
    margin: 0;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    padding: 12px 16px;
    border-radius: 6px;
    color: #ffffff;
    width: 181px;
    background-color: #ff8a3d;
    @media screen and (max-width: 768px) {
      width: 10rem;
    }
  }
`;

interface locationType {
  location: number[];
}

const MakeRoom = ({ location }: locationType) => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('');
  const [textarea, setTextarea] = useState('');
  const [radio, setRadio] = useState('');
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSelect(value);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const textareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setTextarea(event.target.value);
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRadio(event.target.value);
  };
  const data = [
    title,
    select,
    textarea,
    Number(radio),
    String(location[0]),
    String(location[1]),
  ];
  return (
    <Container id="MakeRoom">
      <SidebarHeader containerName={'gotoCreateRoom'}>방 만들기</SidebarHeader>
      <main>
        <section className="MakeRoom-main-section-flex">
          <h1>제목</h1>
          <input type="text" onChange={inputChange} />
        </section>
        <section className="MakeRoom-main-section-flex">
          <h1>카테고리</h1>
          <select id="choise-foods" onChange={selectChange}>
            <option value=""></option>
            <option value="치킨">치킨</option>
            <option value="햄버거">햄버거</option>
            <option value="피자">피자</option>
          </select>
        </section>
        <h1>역할</h1>
        <section className="MakeRoom-main-section-radio">
          <input
            type="radio"
            id="contactChoice1"
            name="contact"
            value="1"
            onChange={radioChange}
          />
          <label htmlFor="contactChoice1">받는 사람</label>
        </section>
        <section className="MakeRoom-main-section-radio">
          <input
            type="radio"
            id="contactChoice2"
            name="contact"
            value="2"
            onChange={radioChange}
          />
          <label htmlFor="contactChoice2">가지러 가는 사람</label>
        </section>
        <section>
          <h1>내용</h1>
          <textarea
            className="MakeRoom-main-section-content"
            onChange={textareaChange}
          />
        </section>
      </main>
      <ButtonContainer>
        <Button onClick={data} containerName={'MakeRoom'}>
          생성하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MakeRoom;
