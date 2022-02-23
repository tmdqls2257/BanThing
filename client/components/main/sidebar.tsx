import { useState } from 'react';
import styled from 'styled-components';
import ChatRoom from './chatRoom';
import CreateRoom from './createRoom';
import JoinRoom from './joinRoom';
import MakeRoom from './makeRoom/makeRoom';
import MobileButton from './mobileButton';

const Container = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: flex;
    z-index: 1;
    background-color: var(--white-color);
    width: 100vw;
    height: 85vh;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    bottom: 0px;
  }
`;

interface locationType {
  location: number[];
  roomsId: number;
}

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

const Sidebar = ({ location, roomsId }: locationType) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [usersChats, setUsersChats] = useState<usersChats>();

  return (
    <SidebarContainer id={'sidebarContainer'}>
      <MobileButton />
      <Container>
        <CreateRoom />
        <MakeRoom location={location} />
        <JoinRoom
          setUsersChats={setUsersChats}
          setroomTitle={setRoomTitle}
          roomsId={roomsId}
        />
        <ChatRoom
          roomTitle={roomTitle}
          roomsId={roomsId}
          usersChats={usersChats}
        />
      </Container>
    </SidebarContainer>
  );
};

export default Sidebar;
