import styles from './newChat.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import ChatService from '../../../chatService';

interface newChatType {
  roomsId: number;
  socket: any;
  setAlarmNumber: Dispatch<SetStateAction<number>>;
  alarmNumber: number;
  chatService: ChatService;
}

const NewChat = ({
  roomsId,
  socket,
  setAlarmNumber,
  alarmNumber,
  chatService,
}: newChatType) => {
  const [chat, setChat] = useState('');
  // 방의 아이디와 덧글을 포함하여 post합니다.
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (chat !== '') {
      axiosPost();
      // chats에 입력한 값을 전해줍니다.
    }
    // input의 값을 초기화 합니다.
    setChat('');
  };

  const axiosPost = () => {
    try {
      chatService.postChats(roomsId, chat);
      socket.emit('sendMessage', chat);
      // setAlarmNumber(alarmNumber + 1);
      new Notification('타이틀', { body: chat });
    } catch (err) {
      console.log(err);
    }
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
