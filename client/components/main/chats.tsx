import axios from 'axios';
import { useEffect, useState } from 'react';
import TweetService from '../../service/chatService';
import Chat from './chat';
import NewChat from './newChat';
import styled from 'styled-components';

const Container = styled.div`
  overflow-y: auto;
  height: 700px;
`;
const Chats = () => {
  const [chats, setChats] = useState<string[]>([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:80/rooms/chat/:id`)
  //     .then((chat) => setChats([...chat.data]));
  // }, []);
  const onCreated = (chat: string) => {
    setChats((chats) => [chat, ...chats]);
    console.log(chats);
  };

  return (
    <>
      <Container>
        {chats.map((chat) => (
          <>
            <Chat chat={chat} onCreated={onCreated} />
          </>
        ))}
      </Container>
      <NewChat onCreated={onCreated} />
    </>
  );
};

export default Chats;
