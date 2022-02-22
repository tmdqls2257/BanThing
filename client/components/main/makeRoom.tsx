import SidebarHeader from './sidebarHeader';
import styled from 'styled-components';
import { setStateType } from '../type';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-width: 30vw;
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

const Button = styled.div`
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

const MakeRoom = () => {
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
  };

  return (
    <Container id="MakeRoom">
      <SidebarHeader containerName={'gotoCreateRoom'}>방 만들기</SidebarHeader>
      <main>
        <section className="MakeRoom-main-section-flex">
          <h1>제목</h1>
          <input type="text" />
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
          <input type="radio" name="category" />
          <p>받는 사람</p>
        </section>
        <section className="MakeRoom-main-section-radio">
          <input type="radio" name="category" />
          <p>가지러 가는 사람</p>
        </section>
        <section>
          <h1>내용</h1>
          <textarea className="MakeRoom-main-section-content" />
        </section>
      </main>
      <Button>
        <button>생성하기</button>
      </Button>
    </Container>
  );
};

export default MakeRoom;
