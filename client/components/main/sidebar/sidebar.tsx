import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './sidebar.module.css';
import ChatRoom from '../chatRoom/chatRoom';
import CreateRoom from '../createRoom/createRoom';
import JoinRoom from '../joinRoom/joinRoom';
import MakeRoom from '../makeRoom/makeRoom';
import MobileButton from '../mobileButton/mobileButton';

interface locationType {
  location: number[];
  roomsId: number;
  setMaprelandering: Dispatch<SetStateAction<boolean>>;
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

const Sidebar = ({
  location,
  roomsId,
  setMaprelandering,
  mapTomobileUp,
}: locationType) => {
  const [roomTitle, setRoomTitle] = useState('');
  const [roomHostNickName, setroomHostNickName] = useState('');
  const [usersChats, setUsersChats] = useState<usersChats>();
  const [roomId, setMakeRoom_MapRoomId] = useState<number>(0);
  const [slide, setSlide] = useState('down');
  const [relandering, setRelandering] = useState(false);
  const [className, setClassName] = useState(styles.slideDown);
  const [markerClick, setMarkerClick] = useState('');
  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  useEffect(() => {
    setMaprelandering(relandering);
  }, [relandering]);

  useEffect(() => {
    if (mapTomobileUp === 'down') {
      setMarkerClick(mapTomobileUp);
    } else if (mapTomobileUp === 'up') {
      setMarkerClick(mapTomobileUp);
    }
  }, [mapTomobileUp]);

  useEffect(() => {
    if (markerClick) {
      setClassName(styles.up);
    }
  }, [markerClick]);

  useEffect(() => {
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
          setRelanering={setRelandering}
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
