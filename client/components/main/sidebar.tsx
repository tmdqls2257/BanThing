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

const Sidebar = ({ location, roomsId }: locationType) => {
  const [roomTitle, setRoomTitle] = useState('');
  return (
    <SidebarContainer id={'sidebarContainer'}>
      <MobileButton />
      <Container>
        <CreateRoom />
        <MakeRoom location={location} />
        <JoinRoom setroomTitle={setRoomTitle} roomsId={roomsId} />
        <ChatRoom roomTitle={roomTitle} />
      </Container>
    </SidebarContainer>
  );
};

export default Sidebar;
