import styled from 'styled-components';
import Button from './button';
import SidebarHeader from './sidebarHeader';

const CreateRoom = styled.div`
  display: none;
  flex-direction: column;
  width: 30vw;
  margin: auto;
  p {
    font-size: var(--font-size-base);
    color: #8e8e8e;
  }
`;

const MakeRoom = styled.div`
  display: none;
  flex-direction: column;
  width: 30vw;
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
    border: none;
    border-radius: var(--border-radius-base);
    background-color: var(--white-color);
    width: var(--sidebar-content-width);
    height: 380px;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const JoinRoom = styled.div`
  display: none;
  flex-direction: column;
  width: var(--sidebar-content-width);
  margin: auto;
  img {
    width: var(--img-size);
  }
  .JoinRoom-profile {
    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--orange-color);
  }
  .JoinRoom-profile-rate {
    background-color: var(--orange-color);
    color: var(--white-color);
    border-radius: var(--border-radius-base);
    width: 95px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .JoinRoom-content_p {
    height: 14rem;
  }
  h3 {
    font-size: var(--font-size-base);
  }
  div {
    display: inline-block;
    margin-top: var(--margine-base);
    margin-right: var(--margine-base);
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  main {
    height: 80vh;
    background-color: var(--chat-background-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  ul {
    height: 100%;
    padding: 0;
  }
  .chatting-list li {
    list-style: none;
    padding: var(--padding-small);
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    margin-top: var(--margine-small);
  }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .image {
    border-radius: 50%;
    margin-right: var(--margine-base);
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
  .message__author {
    margin-bottom: 8px;
    display: block;
  }
  .message__bubble {
    background-color: var(--white-color);
    padding: 10px;
    border-radius: 15px;
    border-top-left-radius: 0;
    margin-right: 5px;
  }
  .message__info {
    display: flex;
    align-items: flex-end;
  }
  .message-row--own .message__bubble {
    background-color: var(--chat-by-me-color);
    border-top-right-radius: 0px;
    border-top-left-radius: 15px;
    margin-left: 5px;
  }
  .message-row__content {
    height: 50px;
    margin-top: var(--margine-large);
  }
  .sent {
    flex-direction: row-reverse;
  }
  .reply__column {
    display: flex;
    position: relative;
    padding: var(--padding-small);
    background-color: var(--gary-color);
  }
  input {
    height: 46px;
    width: 100%;
    border-radius: var(--border-radius-small);
  }
  .input-button {
    color: var(--white-color);
    font-weight: var(--font-weight-bold);
  }
  .reply__column button {
    position: absolute;
    right: 0px;
  }
  .reply__column button {
    background-color: var(--orange-color);
    border: none;
    width: 77px;
    height: 46px;
    border-radius: var(--border-radius-small);
    padding: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: auto;
  div {
    margin-right: var(--margine-small);
  }
`;
const Container = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    position: absolute;
    bottom: 0px;
    z-index: 1;
    background-color: var(--white-color);
    width: 100vw;
    height: 85vh;
  }
`;

const Sidebar = () => {
  return (
    <Container>
      <CreateRoom>
        <img
          src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
          alt=""
        />
        <p>원하는 마크를 선택하거나 방을 만들어주세요.</p>
        <Button containerName={'CreateRoom'}>방 만들기</Button>
      </CreateRoom>
      <MakeRoom>
        <SidebarHeader>방 만들기</SidebarHeader>
        <main>
          <section className="MakeRoom-main-section-flex">
            <h1>제목</h1>
            <input type="text" />
          </section>
          <section className="MakeRoom-main-section-flex">
            <h1>카테고리</h1>
            <select id="choise-foods">
              <option value=""></option>
              <option value="치킨">치킨</option>
              <option value="햄버거">햄버거</option>
              <option value="피자">피자</option>
            </select>
          </section>
          <h1>역할</h1>
          <section className="MakeRoom-main-section-radio">
            <input type="radio" />
            <p>받는 사람</p>
          </section>
          <section className="MakeRoom-main-section-radio">
            <input type="radio" />
            <p>가지러 가는 사람</p>
          </section>
          <section>
            <h1>내용</h1>
            <input className="MakeRoom-main-section-content" type="text" />
          </section>
        </main>
        <ButtonContainer>
          <Button containerName={'MakeRoom'}>생성하기</Button>
        </ButtonContainer>
      </MakeRoom>
      <JoinRoom>
        <section className="JoinRoom-profile">
          <img
            src="https://cdn.discordapp.com/attachments/934007459763326976/943866955880878120/unknown.png"
            alt=""
          />
          <p>방장의 평점</p>
          <div className="JoinRoom-profile-rate">9.6 (12)</div>
        </section>
        <section className="JoinRoom-title">
          <div>
            <h3>제목</h3>
            <h3>카테고리</h3>
            <h3>역할</h3>
          </div>
          <div>
            <p>치킨 같이 드실 분?</p>
            <p>치킨</p>
            <p>가지러 가는 사람</p>
          </div>
        </section>
        <section className="JoinRoom-content">
          <h3>내용</h3>
          <p className="JoinRoom-content_p">
            치킨이 너무 먹고 싶은데 혼자 한 마리 다 못 먹어요.. 반반 시켜서
            양념만 가져가실 분 구합니다!
            <br></br>
            <br></br>
            웬만한 브랜드는 안 가리고 잘 먹어요.
            <br></br>
            바삭하게 튀긴게 먹고 싶어서 지코바 주문하시려는 분은 죄송해요.
            <br></br>
            <br></br>
            주문,배달비 둘 다 반반씩 부담해요
          </p>
        </section>
        <ButtonContainer>
          <Button containerName={'JoinRoom'}>참여하기</Button>
        </ButtonContainer>
      </JoinRoom>
      <ChatRoom>
        <SidebarHeader>MakeRoom에서 받아온 제목</SidebarHeader>
        <main>
          <div className="display-container">
            <ul className="chatting-list">
              <li>
                <img
                  className="image"
                  src="http://127.0.0.1:5501/kakao/CSS/img/npc_17.png"
                  alt=""
                />
                <div className="message-row__content">
                  <span className="message__author">여울</span>
                  <div className="message__info">
                    <span className="message__bubble">안녕하세요</span>
                    <span className="message__time">18:12</span>
                  </div>
                </div>
              </li>
              <li className="sent">
                <div className="message-row--own message-row__content message__info">
                  <span className="message__time">18:13</span>
                  <span className="message__bubble">어제는 뭐 하셨나요?</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="reply__column">
            <input type="text" />
            <button className="input-button">Enter</button>
          </div>
        </main>
        <ButtonContainer>
          <div>
            <Button containerName={'합의완료'}>생성하기</Button>
          </div>

          <Button containerName={'나가기'}>생성하기</Button>
        </ButtonContainer>
      </ChatRoom>
    </Container>
  );
};

export default Sidebar;
