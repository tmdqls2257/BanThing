import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import styles from './sidebar.module.css';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';
import ChatService from '../../../chatService';
import AxiosClient from '../../../axios';
import { Socket } from 'socket.io-client';

interface locationType {
  alarmNumber: number;
  location: number[];
  roomsId: number;
  httpClient: AxiosClient;
  socket: Socket;
  setAlarmNumber: Dispatch<SetStateAction<number>>;
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

const Sidebar = ({
  location,
  roomsId,
  httpClient,
  socket,
  setAlarmNumber,
  alarmNumber,
}: locationType) => {
  // JoinRoom에서 받아온 roomTitle을 chatRoom으로 보내줍니다.
  const [roomTitle, setRoomTitle] = useState('');
  // JoinRoom에서 받아온 HostNickName을 chatRoom으로 보내줍니다.
  const [roomHostNickName, setroomHostNickName] = useState('');
  // JoinRoom에서 받아온 특정 방의 덧글을 받아옵니다.
  const [usersChats, setUsersChats] = useState<usersChats>();
  // makeRoom에서 room의 ID를 JoinRoom과 ChatRoom으로 보내줍니다.
  const [roomId, setMakeRoomMapRoomId] = useState<number>(0);
  // 모바일 버튼 클릭시 애니메이션의 상태
  const [slide, setSlide] = useState('down');
  // 클릭 상태에 따라 달라지는 class
  const [className, setClassName] = useState(styles.slideDown);

  const [nickname, setNickname] = useState('');
  const chatService = new ChatService(httpClient);

  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoomMapRoomId(roomsId);
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
          socket={socket}
          location={location}
          setMakeRoomMapRoomId={setMakeRoomMapRoomId}
          httpClient={httpClient}
        />
        <JoinRoom
          nickname={nickname}
          socket={socket}
          setroomHostNickName={setroomHostNickName}
          setUsersChats={setUsersChats}
          setroomTitle={setRoomTitle}
          roomsId={roomId}
          chatService={chatService}
          httpClient={httpClient}
        />
        <ChatRoom
          alarmNumber={alarmNumber}
          setAlarmNumber={setAlarmNumber}
          setUserNickname={setNickname}
          socket={socket}
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
