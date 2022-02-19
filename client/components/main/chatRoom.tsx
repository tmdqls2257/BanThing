import Button from './button';
import SidebarHeader from './sidebarHeader';
import styled from 'styled-components';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-height: 715px;
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

const ChatRoom = () => {
  return (
    <>
      <Container id="ChatRoom">
        <SidebarHeader containerName={'gotoJoinRoom'}>
          MakeRoom에서 받아온 제목
        </SidebarHeader>
        <main>
          <div className="display-container">
            <ul className="chatting-list">
              <li>
                <img
                  className="image"
                  src="https://cdn.discordapp.com/attachments/934007459763326976/944397124114722826/unknown.png"
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
      </Container>
    </>
  );
};

export default ChatRoom;
