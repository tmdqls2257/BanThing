import { useEffect, useState } from 'react';
import Chat from './chat';
import NewChat from './newChat';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  overflow-y: auto;
  min-height: 515px;
  max-height: 74vh;
  /* padding-bottom: 64px; */
  ::-webkit-scrollbar {
    width: 0;
  }
`;

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
interface ChatsType {
  addable: boolean;
  roomsId: number;
  usersChats: usersChats | undefined;
}

const Chats = ({ usersChats, roomsId, addable }: ChatsType) => {
  const [ownernickname, setNickname] = useState('');
  const [userchat, setChat] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        })
        .then((response) => {
          const { userInfo } = response.data.data;
          setNickname(userInfo.nickname);
        });
    }
  }, []);

  const onCreated = (chat: string) => {
    usersChats?.data.replyLog.push({
      id: usersChats?.data.replyLog.length + 1,
      nickname: ownernickname,
      post_id: 1,
      reply: chat,
      time: String(new Date()),
    });
    setChat((chats) => [...chats, chat]);
    const chatContainer = document.querySelector(
      '.chat-Container',
    )! as HTMLElement;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  };

  return (
    <>
      <Container className="chat-Container">
        {usersChats?.data.replyLog ? (
          usersChats?.data.replyLog.map((chat) => (
            <>
              <Chat
                key={chat.id}
                owner={ownernickname === chat.nickname}
                chats={chat.reply}
                nickname={chat.nickname}
                time={chat.time}
                userchat={userchat}
              />
            </>
          ))
        ) : (
          <></>
        )}
      </Container>
      {addable && <NewChat onCreated={onCreated} roomsId={roomsId} />}
    </>
  );
};

export default Chats;
