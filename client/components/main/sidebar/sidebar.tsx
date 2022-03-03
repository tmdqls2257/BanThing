import { useEffect, useMemo, useState } from 'react';
import styles from './sidebar.module.css';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';

interface locationType {
  location: number[];
  roomsId: number;
  mapTomobileUp: string;
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

const Sidebar = ({ location, roomsId, mapTomobileUp }: locationType) => {
  // JoinRoom에서 받아온 roomTitle을 chatRoom으로 보내줍니다.
  const [roomTitle, setRoomTitle] = useState('');
  // JoinRoom에서 받아온 HostNickName을 chatRoom으로 보내줍니다.
  const [roomHostNickName, setroomHostNickName] = useState('');
  // JoinRoom에서 받아온 특정 방의 덧글을 받아옵니다.
  const [usersChats, setUsersChats] = useState<usersChats>();
  // makeRoom에서
  const [roomId, setMakeRoom_MapRoomId] = useState<number>(0);
  const [slide, setSlide] = useState('down');
  const [className, setClassName] = useState(styles.slideDown);
  const [markerClick, setMarkerClick] = useState('');

  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  useMemo(() => {
    if (mapTomobileUp === 'down') {
      setMarkerClick(mapTomobileUp);
    } else if (mapTomobileUp === 'up') {
      setMarkerClick(mapTomobileUp);
    }
  }, [mapTomobileUp]);

  useMemo(() => {
    if (markerClick) {
      setClassName(styles.up);
    }
    console.log(slide);
  }, [markerClick]);

  useMemo(() => {
    console.log(slide);
    if (slide === 'down') {
      setClassName(styles.down);
    } else if (slide === 'up') {
      setClassName(styles.up);
    }
    console.log(1);
    console.log(slide);
    console.log(className);
  }, [slide]);

  return (
    <section className={className} id={'sidebarContainer'}>
      <MobileButton setSlide={setSlide} />
      <section className={styles.section} id={'sidebarContainer_section'}>
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
