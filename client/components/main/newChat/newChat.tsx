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
      if (typeof window !== 'undefined' && window.localStorage) {
        const auth = localStorage.getItem('auth');
        const accessToken = localStorage.getItem('accessToken');
        const innerCookie = document.cookie.split(';')[1];
        const kakaoToken = innerCookie.split('=')[1];
        if (auth === 'banthing') {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
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
        } else {
          const headers = {
            Authorization: `Bearer ${kakaoToken}`,
          };
          axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply/kakao`,
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
