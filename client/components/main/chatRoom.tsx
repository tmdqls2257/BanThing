import Button from './button';
import SidebarHeader from './sidebarHeader';
import styled from 'styled-components';
import Modal from './rate';
import Chats from './chats';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-height: 715px;
  width: 30vw;
  min-width: 400px;
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
interface usersChats {
  data: {
    replyLog: [
      {
        id: number;
        nickname: string;
        post_id: number;
        reply: string;
        time: string;
      },
    ];
  };
}

interface roomsIdTitleType {
  roomsId: number;
  roomTitle: string;
  usersChats: usersChats | undefined;
}

const ChatRoom = ({ usersChats, roomTitle, roomsId }: roomsIdTitleType) => {
  console.log(usersChats);

  return (
    <>
      <Container id="ChatRoom">
        <SidebarHeader containerName={'gotoJoinRoom'}>
          {roomTitle}
        </SidebarHeader>
        <main>
          <Chats
            usersChats={usersChats}
            roomsId={roomsId}
            addable={true}
          ></Chats>
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
