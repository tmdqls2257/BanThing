import { useEffect, useState } from 'react';
import Chat from '../chat/chat';
import styled from 'styled-components';
import NewChat from '../newChat';

const Container = styled.div`
  overflow-y: scroll;
  min-height: 50px;
  max-height: 70vh;
  ::-webkit-scrollbar {
    width: 0;
  }
  @media screen and (max-height: 480px) {
    max-height: 120vh;
  }
  @media screen and (max-height: 580px) {
    max-height: 100vh;
  }
  @media screen and (max-height: 680px) {
    max-height: 80vh;
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
  usernickname: string;
}

const Chats = ({ usersChats, roomsId, addable, usernickname }: ChatsType) => {
  const [userchat, setChat] = useState<string[]>([]);

  const onCreated = (chat: string) => {
    usersChats?.data.replyLog.push({
      id: usersChats?.data.replyLog.length + 1,
      nickname: usernickname,
      post_id: 1,
      reply: chat,
      time: String(new Date()),
    });
    setChat((chats) => [...chats, chat]);
  };

  useEffect(() => {
    const chatContainer = document.querySelector(
      '.chat-Container',
    )! as HTMLElement;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, [userchat.length]);

  return (
    <>
      <Container className="chat-Container">
        {usersChats?.data.replyLog ? (
          usersChats?.data.replyLog.map((chat) => (
            <Chat
              key={chat.id}
              owner={usernickname === chat.nickname}
              chats={chat.reply}
              nickname={chat.nickname}
              time={chat.time}
            />
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
