import styles from './chatRoom.module.css';
import buttonStyle from '../button.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarHeader from '../sidebarHeader/sidebarHeader';
import Chats from '../chats/chats';
import Modal from '../removeModal/removeModal';

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
  roomHostNickName: string;
}

const ChatRoom = ({
  usersChats,
  roomTitle,
  roomsId,
  roomHostNickName,
}: roomsIdTitleType) => {
  const [usernickname, setNickname] = useState('');

  useEffect(() => {
    let cookie: any;
    let cookieToken: any;
    let cookieList: any;
    if (typeof window !== 'undefined') {
      console.log(1);

      cookie = document.cookie;
      if (cookie.includes(';') && cookie.includes('accessToken')) {
        cookieList = cookie.split(';');
        const findAccessToken = cookieList.filter((cookie: any) => {
          return cookie.includes('accessToken');
        });
        cookieToken = findAccessToken[0].split('=')[1];
      } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
        cookieToken = cookie.split('=')[1];
      }
      if (cookieToken) {
        axios
          .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
            headers: {
              Authorization: `Bearer ${cookieToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((response) => {
            const { userInfo } = response.data.data;
            setNickname(userInfo.nickname);
          });
      }
    }
  }, []);

  const onClick = () => {
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;
    removeModal.style.display = 'flex';
  };

  if (usernickname === roomHostNickName) {
    return (
      <>
        <section id="ChatRoom" className={styles.section}>
          <SidebarHeader containerName={'gotoJoinRoom'}>
            {roomTitle}
          </SidebarHeader>
          <main className={styles.main}>
            <Chats
              usernickname={usernickname}
              usersChats={usersChats}
              roomsId={roomsId}
              addable={true}
            ></Chats>
          </main>
          <section className={buttonStyle.button_owner_container}>
            <button className={buttonStyle.button} onClick={onClick}>
              삭제하기
            </button>
          </section>
          <Modal removeRoomId={roomsId} />
        </section>
      </>
    );
  }
  return (
    <>
      <section id="ChatRoom" className={styles.section}>
        <SidebarHeader containerName={'gotoJoinRoom'}>
          {roomTitle}
        </SidebarHeader>
        <main className={styles.main}>
          <Chats
            usernickname={usernickname}
            usersChats={usersChats}
            roomsId={roomsId}
            addable={true}
          ></Chats>
        </main>
        <section className={buttonStyle.button_not_owner_container}></section>
      </section>
    </>
  );
};

export default ChatRoom;
