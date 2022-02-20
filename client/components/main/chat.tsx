import styled from 'styled-components';

const Container = styled.div`
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
`;
const chat = () => {
  return (
    <Container>
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
    </Container>
  );
};

export default chat;
