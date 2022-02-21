import Button from './button';
import SidebarHeader from './sidebarHeader';
import styled from 'styled-components';
import Modal from './rate';
import Chats from './chats';
import NewChat from './newChat';
import { memo, useState } from 'react';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-height: 715px;
  width: 30vw;
  main {
    background-color: var(--chat-background-color);
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: var(--margine-base) auto;
  div {
    margin: 0 4px;
  }
`;
const ChatRoom = () => {
  const [error, setError] = useState<string>('');
  const onError = (error: string) => {
    setError(error.toString());
    setTimeout(() => {
      setError('');
    }, 3000);
  };

  return (
    <>
      <Container id="ChatRoom">
        <SidebarHeader containerName={'gotoJoinRoom'}>
          MakeRoom에서 받아온 제목
        </SidebarHeader>
        <main>
          <Chats></Chats>
          <NewChat onError={onError} />
        </main>
        <ButtonContainer>
          <div>
            <Button containerName={'합의완료'}>합의완료</Button>
          </div>
          <div>
            <Button containerName={'나가기'}>나가기</Button>
          </div>
        </ButtonContainer>
        <Modal />
      </Container>
    </>
  );
};

export default ChatRoom;
