import { useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';

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
  const [slide, setSlide] = useState('down');
  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  return (
    <section className={styles.sidebar_container} id={'sidebarContainer'}>
      <MobileButton setSlide={setSlide} />
      <section className={styles.section}>
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
      </section>
    </section>
  );
};

export default Sidebar;
