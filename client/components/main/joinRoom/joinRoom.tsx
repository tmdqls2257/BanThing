import styles from './joinRoom.module.css';
import buttonStyle from '../button.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface roomData {
  data: {
    post: {
      category: string;
      content: string;
      host_nickname: string;
      host_role: number;
      id: number;
      title: string;
    };
  };
}
interface roomsIdType {
  roomsId: number;
  setroomTitle: Dispatch<SetStateAction<string>>;
  setUsersChats: Dispatch<SetStateAction<usersChats | undefined>>;
  setroomHostNickName: Dispatch<SetStateAction<string>>;
}
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
const JoinRoom = ({
  setUsersChats,
  roomsId,
  setroomTitle,
  setroomHostNickName,
}: roomsIdType) => {
  const [data, setData] = useState<roomData>();
  const [chats, setChats] = useState<usersChats>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (roomsId !== 0) {
          axios
            .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/main`, {
              id: roomsId,
            })
            .then((response) => {
              setData(response.data);
            });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [roomsId]);
  useEffect(() => {
    if (chats) {
      setUsersChats(chats);
    }

    if (data) {
      setroomTitle(data.data.post.title);
      setroomHostNickName(data.data.post.host_nickname);
    }
  }, [chats, data]);
  const onClick = () => {
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    if (typeof window !== 'undefined' && window.localStorage && data) {
      const auth = localStorage.getItem('auth');
      const accessToken = localStorage.getItem('accessToken');
      const cookie = document.cookie.split(';')[1];
      const kakaoToken = cookie.split('=')[1];
      if (auth === 'banthing') {
        const getPosts = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${accessToken}`,
            };
            const response: AxiosResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply/${data.data.post.id}`,
              {
                headers,
                withCredentials: true,
              },
            );
            setChats(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        getPosts();
      } else {
        const getPosts = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${kakaoToken}`,
            };
            const response: AxiosResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/reply/kakao/${data.data.post.id}`,
              {
                headers,
                withCredentials: true,
              },
            );
            setChats(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        getPosts();
      }
    }
    joinRoom.style.display = 'none';
    chatRoom.style.display = 'flex';
  };

  const rendering = () => {
    if (data) {
      const { category } = data.data.post;
      if (category === '피자') {
        return <img src="/image/pizza.png" alt="" className={styles.image} />;
      } else if (category === '치킨') {
        return <img src="/image/chicken.png" alt="" className={styles.image} />;
      } else if (category === '햄버거') {
        return (
          <img src="/image/hamburger.png" alt="" className={styles.image} />
        );
      } else if (category === '한식') {
        return <img src="/image/rice.png" alt="" className={styles.image} />;
      } else if (category === '자장면') {
        return (
          <img src="/image/chNoodles.png" alt="" className={styles.image} />
        );
      } else if (category === '커피*디저트') {
        return <img src="/image/coffee.png" alt="" className={styles.image} />;
      } else if (category === '도시락') {
        return (
          <img src="/image/lunchBox.png" alt="" className={styles.image} />
        );
      } else if (category === '일식') {
        return <img src="/image/sushi.png" alt="" className={styles.image} />;
      } else if (category === '분식') {
        return (
          <img src="/image/tteokbokki.png" alt="" className={styles.image} />
        );
      }
    }
  };

  return (
    <section id="JoinRoom" className={styles.JoinRoom}>
      {data ? (
        <>
          <section className={styles.joinRoom_profile}>
            {rendering()}
            <h1>{data.data.post.host_nickname}</h1>
          </section>
          <article className={styles.article}>
            <section className={styles.JoinRoom_title}>
              <div className={styles.div}>
                <h3 className={styles.h3}>제목</h3>
                <h3 className={styles.h3}>카테고리</h3>
                <h3 className={styles.h3}>역할</h3>
                <h3 className={styles.h3}>내용</h3>
              </div>
              <div className={styles.div}>
                <p>{data.data.post.title}</p>
                <p>{data.data.post.category}</p>
                {data.data.post.host_role === 1 ? (
                  <p>받는 사람</p>
                ) : (
                  <p>가지러 가는 사람</p>
                )}
              </div>
            </section>
            <section>
              <p className={styles.joinRoom_content_p}>
                {data.data.post.content}
              </p>
            </section>
          </article>
          <section className={buttonStyle.button_container}>
            <button className={buttonStyle.button} onClick={onClick}>
              참여하기
            </button>
          </section>
        </>
      ) : (
        <h1>로그인해주세요</h1>
      )}
    </section>
  );
};

export default JoinRoom;
