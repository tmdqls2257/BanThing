import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Chat from './chat';
import NewChat from './newChat';
import styled from 'styled-components';

const Container = styled.div`
  overflow-y: auto;
  max-height: 70vh;
  ::-webkit-scrollbar {
    width: 0;
  }
`;

const user = [
  {
    id: 1,
    rooms_id: 4,
    nickname: '돼지',
    chat: '안녕하세요',
    time: '2022-02-20T09:48:45.925Z',
  },
  {
    id: 2,
    rooms_id: 4,
    nickname: '돼지',
    chat: '무슨 브랜드 원하세요?',
    time: '2022-02-20T09:51:33.427Z',
  },
  {
    id: 2,
    rooms_id: 4,
    nickname: '돼지',
    chat: 'BBQ요',
    time: '2022-02-20T09:51:33.427Z',
  },
];
interface ChatsType {
  addable: boolean;
}

const Chats = ({ addable }: ChatsType) => {
  const [chats, setChats] = useState<string[]>([]);
  const [user, setUser] = useState([]);

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const response: AxiosResponse = await axios.get(
  //       `http://${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/rooms/chat/1`,
  //     );
  //     setChats(response.data.message);
  //     setUser(response.data);
  //   };
  //   getPosts();
  // }, []);

  const onCreated = (chat: string) => {
    setChats((chats) => [...chats, chat]);
    console.log(chats);
  };

  return (
    <>
      <Container>
        {chats.map((chat) => (
          <>
            <Chat key={'chat'} owner={true} chat={chat} onCreated={onCreated} />
          </>
        ))}
      </Container>
      {addable && <NewChat onCreated={onCreated} />}
    </>
  );
};

export default Chats;
