import styles from './chatRoom.module.css';
import { useEffect, useState } from 'react';
import SidebarHeader from '../sidebarHeader/sidebarHeader';
import Chats from '../chats/chats';
import Modal from '../removeModal/removeModal';
import ChatService from '../../../chatService';
import AxiosClient from '../../../axios';

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
  chatService: ChatService;
  httpClient: AxiosClient;
}

const ChatRoom = ({
  usersChats,
  roomTitle,
  roomsId,
  roomHostNickName,
  chatService,
  httpClient,
}: roomsIdTitleType) => {
  // 유저의 닉네임
  const [usernickname, setNickname] = useState('');

  // 유저의 닉네임을 받아옵니다.
  useEffect(() => {
    let headers = chatService.getHeaders();
    if (headers) {
      axiosGet(headers);
    }
  }, []);

  const axiosGet = (headers: { Authorization: string }) => {
    try {
      httpClient
        .axios(`/mypage`, {
          method: 'get',
          headers,
          withCredentials: true,
        })
        .then((res) => {
          const { userInfo } = res.data;
          setNickname(userInfo.nickname);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // 유저의 닉네임과 호스트의 닉네임이 같을 경우 삭제하기 버튼을 띄어줍니다.
  if (usernickname === roomHostNickName) {
    return (
      <section id="ChatRoom" className={styles.section}>
        <SidebarHeader isHost={true} containerName={'gotoJoinRoom'}>
          {roomTitle}
        </SidebarHeader>
        <main className={styles.main}>
          <Chats
            chatService={chatService}
            usernickname={usernickname}
            usersChats={usersChats}
            roomsId={roomsId}
            addable={true}
          ></Chats>
        </main>
        <Modal removeRoomId={roomsId} />
      </section>
    );
  }
  return (
    <section id="ChatRoom" className={styles.section}>
      <SidebarHeader isHost={false} containerName={'gotoJoinRoom'}>
        {roomTitle}
      </SidebarHeader>
      <main className={styles.main}>
        <Chats
          chatService={chatService}
          usernickname={usernickname}
          usersChats={usersChats}
          roomsId={roomsId}
          addable={true}
        ></Chats>
      </main>
    </section>
  );
};

export default ChatRoom;
