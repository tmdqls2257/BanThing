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
import Reveal, { Slide } from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';

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
  const [mapToMobileValue, setMapToMobileValue] = useState('');
  useEffect(() => {
    if (roomsId !== 0) {
      setMakeRoom_MapRoomId(roomsId);
    }
  }, [roomsId]);

  useCallback(() => {
    setMaprelandering(relandering);
  }, [relandering]);
  const downAnimation = keyframes`
  
  from {
    transform: translate3d(0, 10vh, 0);
  }

  to {
    transform: translate3d(0, 80vh, 0);
  }
`;
  const upAnimation = keyframes`
from {
  transform: translate3d(0, 80vh, 0);
}

to {
  transform: translate3d(0, 10vh, 0);
}
`;
  const resetAnimation = keyframes`
from {
  transform: translate3d(0, 80vh, 0);
}

to {
  transform: translate3d(0, -1100, 0);
}
`;

  console.log(mapTomobileUp);
  if (typeof window !== 'undefined')
    if (window.innerWidth <= 768) {
      return (
        <section className={styles.sidebar_container} id={'sidebarContainer'}>
          {slide === 'down' ? (
            <Reveal className={styles.downAnimation} keyframes={downAnimation}>
              <>
                <MobileButton setSlide={setSlide} />
                <section className={styles.section}>
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
              </>
            </Reveal>
          ) : (
            <>
              <Reveal className={styles.upAnimation} keyframes={upAnimation}>
                <>
                  <MobileButton setSlide={setSlide} />
                  <section className={styles.section}>
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
                </>
              </Reveal>
            </>
          )}
        </section>
      );
    }
  return (
    <section className={styles.sidebar_container} id={'sidebarContainer'}>
      <MobileButton setSlide={setSlide} />
      <section className={styles.section}>
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
