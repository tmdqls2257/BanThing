import { useEffect, useState } from 'react';
import Chat from './chat';
import NewChat from './newChat';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  overflow-y: auto;
  max-height: 72vh;
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

  return (
    <>
      <Container>
        {usersChats?.data.replyLog ? (
          usersChats?.data.replyLog.map((chat) => (
            <>
              <Chat
                key={chat.id}
                owner={ownernickname === chat.nickname}
                chats={chat.reply}
                nickname={chat.nickname}
                time={chat.time}
              />
            </>
          ))
        ) : (
          <></>
        )}
      </Container>
      {addable && <NewChat roomsId={roomsId} />}
    </>
  );
};

export default Chats;
