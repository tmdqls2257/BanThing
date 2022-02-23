import { useEffect, useState } from 'react';
import Chat from './chat';
import NewChat from './newChat';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  overflow-y: auto;
  max-height: 70vh;
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
  const [chats, setChats] = useState<string[]>([]);
  const [nickname, setNickname] = useState('');
  console.log(usersChats?.data.replyLog);

  const onCreated = (chat: string) => {
    setChats((chats) => [...chats, chat]);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
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

  return (
    <>
      <Container>
        {usersChats?.data.replyLog ? (
          usersChats?.data.replyLog.map((chat) => (
            <>
              <Chat
                key={chat.id}
                owner={nickname === chat.nickname}
                chat={chat.reply}
                onCreated={onCreated}
              />
            </>
          ))
        ) : (
          <></>
        )}
      </Container>
      {addable && <NewChat roomsId={roomsId} onCreated={onCreated} />}
    </>
  );
};

export default Chats;
