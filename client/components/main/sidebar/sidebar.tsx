import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';

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
  const [roomHostNickName, setroomHostNickName] = useState('');
  const [usersChats, setUsersChats] = useState<usersChats>();
  const [roomId, setMakeRoom_MapRoomId] = useState<number>(0);

  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  return (
    <SidebarContainer id={'sidebarContainer'}>
      <MobileButton />
      <Container>
        <CreateRoom />
        <MakeRoom
          location={location}
          setMakeRoom_MapRoomId={setMakeRoom_MapRoomId}
        />
        <JoinRoom
          setroomHostNickName={setroomHostNickName}
          setUsersChats={setUsersChats}
          setroomTitle={setRoomTitle}
          roomsId={roomId}
        />
        <ChatRoom
          roomHostNickName={roomHostNickName}
          roomTitle={roomTitle}
          roomsId={roomId}
          usersChats={usersChats}
        />
      </Container>
    </SidebarContainer>
  );
};

export default Sidebar;
