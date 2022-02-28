import axios from 'axios';
import styles from './newChat.module.css';
import { useState } from 'react';

interface newChatType {
  roomsId: number;
  onCreated: (chat: string) => void;
}

const NewChat = ({ roomsId, onCreated }: newChatType) => {
  const [chat, setChat] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (chat !== '') {
      let cookie: any;
      let cookieToken: any;
      let cookieList: any;
      if (typeof window !== 'undefined') {
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
        const headers = {
          Authorization: `Bearer ${cookieToken}`,
        };
        axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply`,
          {
            post_id: roomsId,
            reply: chat,
          },
          {
            headers,
            withCredentials: true,
          },
        );
      }
      onCreated(chat);
    }
    setChat('');
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };
  return (
    <>
      <form className={styles.reply__column} onSubmit={onSubmit}>
        <input
          className={styles.input}
          type="text"
          onChange={onChange}
          value={chat}
        />
        <button className={styles.input_button}>Enter</button>
      </form>
    </>
  );
};

export default NewChat;
