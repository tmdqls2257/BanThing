import { useEffect, useMemo, useState } from 'react';
import styles from './sidebar.module.css';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';
import ChatService from '../../../chatService';
import AxiosClient from '../../../axios';

interface locationType {
  location: number[];
  roomsId: number;
  httpClient: AxiosClient;
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

const Sidebar = ({ location, roomsId, httpClient }: locationType) => {
  // JoinRoom에서 받아온 roomTitle을 chatRoom으로 보내줍니다.
  const [roomTitle, setRoomTitle] = useState('');
  // JoinRoom에서 받아온 HostNickName을 chatRoom으로 보내줍니다.
  const [roomHostNickName, setroomHostNickName] = useState('');
  // JoinRoom에서 받아온 특정 방의 덧글을 받아옵니다.
  const [usersChats, setUsersChats] = useState<usersChats>();
  // makeRoom에서 room의 ID를 JoinRoom과 ChatRoom으로 보내줍니다.
  const [roomId, setMakeRoom_MapRoomId] = useState<number>(0);
  // 모바일 버튼 클릭시 애니메이션의 상태
  const [slide, setSlide] = useState('down');
  // 클릭 상태에 따라 달라지는 class
  const [className, setClassName] = useState(styles.slideDown);

  const chatService = new ChatService(httpClient);

  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  useMemo(() => {
    if (slide === 'down') {
      setClassName(styles.down);
    } else if (slide === 'up') {
      setClassName(styles.up);
    }
  }, [slide]);

  return (
    <section className={className} id={'sidebarContainer'}>
      <MobileButton setSlide={setSlide} />
      <section className={styles.section} id={'sidebarContainer_section'}>
        <CreateRoom />
        <MakeRoom
          location={location}
          setMakeRoom_MapRoomId={setMakeRoom_MapRoomId}
          chatService={chatService}
          httpClient={httpClient}
        />
        <JoinRoom
          setroomHostNickName={setroomHostNickName}
          setUsersChats={setUsersChats}
          setroomTitle={setRoomTitle}
          roomsId={roomId}
          chatService={chatService}
        />
        <ChatRoom
          roomHostNickName={roomHostNickName}
          roomTitle={roomTitle}
          roomsId={roomId}
          usersChats={usersChats}
          chatService={chatService}
          httpClient={httpClient}
        />
      </section>
    </section>
  );
};

export default Sidebar;
