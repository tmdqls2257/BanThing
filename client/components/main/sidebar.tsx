import styled from 'styled-components';
import Button from './button';
import SidebarHeader from './sidebarHeader';

const CreateRoom = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30vw;
  height: auto;
  margin: auto;
  img {
    width: 4.75rem;
  }
  p {
    font-size: var(--font-size-base);
    color: #8e8e8e;
  }
`;

const MakeRoom = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-width: 30vw;
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
    background-color: var(--gary-color);
    width: var(--sidebar-content-width);
    height: 380px;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const JoinRoom = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-width: 30vw;
  img {
    width: var(--img-size);
  }
  article {
    margin: auto;
  }
  .JoinRoom-title {
    display: flex;
  }
  .JoinRoom-profile {
    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
    }
    margin: var(--margine-4rem) 0;
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
    width: var(--sidebar-content-width);
  }
  h3 {
    font-size: var(--font-size-base);
  }
  div {
    display: inline-block;
    margin-top: var(--margine-base);
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ChatRoom = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-width: 30vw;
  main {
    background-color: var(--chat-background-color);
    display: flex;
    flex: 1;
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
  margin: var(--margine-base) auto;
  div {
    margin: var(--margine-small);
  }
`;
const Container = styled.div`
  display: flex;
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
      <CreateRoom id="CreateRoom">
        <img
          src="https://cdn.discordapp.com/attachments/934007459763326976/943504292072026153/unknown.png"
          alt=""
        />
        <p>원하는 마크를 선택하거나 방을 만들어주세요.</p>
        <ButtonContainer>
          <Button containerName={'CreateRoom'}>방 만들기</Button>
        </ButtonContainer>
      </CreateRoom>
      <MakeRoom id="MakeRoom">
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
      <JoinRoom id="JoinRoom">
        <section className="JoinRoom-profile">
          <img
            src="https://cdn.discordapp.com/attachments/934007459763326976/943866955880878120/unknown.png"
            alt=""
          />
          <p>방장의 평점</p>
          <div className="JoinRoom-profile-rate">9.6 (12)</div>
        </section>
        <article>
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
        </article>
        <ButtonContainer>
          <Button containerName={'JoinRoom'}>참여하기</Button>
        </ButtonContainer>
      </JoinRoom>
      <ChatRoom id="ChatRoom">
        <SidebarHeader>MakeRoom에서 받아온 제목</SidebarHeader>
        <main>
          <div className="display-container">
            <ul className="chatting-list">
              <li>
                <img
                  className="image"
                  src="data:image/jpeg;base64,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"
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
            <Button containerName={'합의완료'}>합의완료</Button>
          </div>
          <div>
            <Button containerName={'나가기'}>나가기</Button>
          </div>
        </ButtonContainer>
      </ChatRoom>
    </Container>
  );
};

export default Sidebar;
