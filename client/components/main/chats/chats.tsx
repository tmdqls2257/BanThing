import { useEffect, useState } from 'react';
import styles from './chats.module.css';
import Chat from '../chat/chat';
import NewChat from '../newChat/newChat';

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
  roomHostNickName: boolean;
}

const Chats = ({
  usersChats,
  roomsId,
  addable,
  usernickname,
  roomHostNickName,
}: ChatsType) => {
  const [userchat, setChat] = useState<string[]>([]);
  const [chatsClassName, setChatsClassName] = useState<string>('');
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
      '#chat-Container',
    )! as HTMLElement;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
  }, [userchat.length]);
  useEffect(() => {
    if (roomHostNickName) {
      setChatsClassName(styles.chat_container_ownerRoom);
    } else {
      setChatsClassName(styles.chat_container);
    }
  }, [roomHostNickName]);
  console.log(chatsClassName);

  return (
    <>
      <section className={chatsClassName} id={'chat-Container'}>
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
      </section>
      {addable && <NewChat onCreated={onCreated} roomsId={roomsId} />}
    </>
  );
};

export default Chats;
