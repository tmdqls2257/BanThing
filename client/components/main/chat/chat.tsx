import styles from './chat.module.css';

export interface chatType {
  chats: string;
  owner: boolean;
  nickname: string;
  time: string;
}

const chat = ({ nickname, owner, chats, time }: chatType) => {
  const clock = new Date(Date.parse(time));
  let minute = String(clock.getMinutes());
  let hour = String(clock.getHours());

  if (clock.getMinutes() < 10) {
    minute = '0' + minute;
  } else if (clock.getHours() < 10) {
    hour = '0' + hour;
  }
  return (
    <ul className={styles.chatting_list}>
      {!owner ? (
        <li className={styles.chatting_list__li}>
          <img
            className={styles.image}
            src="https://cdn.discordapp.com/attachments/934007459763326976/944397124114722826/unknown.png"
            alt=""
          />
          <div>
            <span className={styles.message__author}>{nickname}</span>
            <div className={styles.message__info}>
              <span className={styles.message__bubble}>{chats}</span>
              <span>
                {hour}:{minute}
              </span>
            </div>
          </div>
        </li>
      ) : (
        <li className={styles.sent}>
          <div className="message-row--own message-row__content message__info">
            <span>
              {hour}:{minute}
            </span>
            <span className={styles.message__bubble__user}>{chats}</span>
          </div>
        </li>
      )}
    </ul>
  );
};

export default chat;
