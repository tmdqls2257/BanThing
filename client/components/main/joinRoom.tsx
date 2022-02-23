import Button from './button';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  width: 30vw;
  min-width: 400px;
  min-height: 715px;

  height: auto;
  img {
    width: var(--img-size);
    margin: var(--margine-large);
  }
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
  }
  .JoinRoom-title {
    display: flex;
  }
  .JoinRoom-profile {
    p {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-bold);
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--orange-color);
  }
  .JoinRoom-profile-rate {
    background-color: var(--orange-color);
    color: var(--white-color);
    border-radius: var(--border-radius-base);
    width: 95px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .JoinRoom-content_p {
    padding: 32px;
    line-height: 1.5;
    display: flex;
    border: none;
    border-radius: var(--border-radius-base);
    background-color: var(--gary-color);
    max-width: 40vh;
    width: var(--sidebar-content-width);
    max-height: 30vh;
    height: 20vh;
    ::-webkit-scrollbar {
      width: 0;
    }
  }
  h3 {
    font-size: var(--font-size-base);
  }
  div {
    display: inline-block;
    margin-top: var(--margine-base);
    margin-right: var(--margine-base);
  }

  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  margin: auto;
`;

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
const JoinRoom = ({ setUsersChats, roomsId, setroomTitle }: roomsIdType) => {
  const [data, setData] = useState<roomData>();
  const [chats, setChats] = useState<usersChats>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (roomsId !== 0) {
          const response: AxiosResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/main`,
            {
              id: roomsId,
            },
          );
          setData(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [roomsId]);
  if (chats) {
    setUsersChats(chats);
  }

  if (data) {
    setroomTitle(data.data.post.title);
  }

  return (
    <Container id="JoinRoom">
      {data ? (
        <>
          <section className="JoinRoom-profile">
            <img
              src="https://cdn.discordapp.com/attachments/934007459763326976/943866955880878120/unknown.png"
              alt=""
            />
            <h1>{data.data.post.host_nickname}</h1>
          </section>
          <article>
            <section className="JoinRoom-title">
              <div>
                <h3>제목</h3>
                <h3>카테고리</h3>
                <h3>역할</h3>
                <h3>내용</h3>
              </div>
              <div>
                <p>{data.data.post.title}</p>
                <p>{data.data.post.category}</p>
                {data.data.post.host_role === 1 ? (
                  <p>받는 사람</p>
                ) : (
                  <p>가지러 가는 사람</p>
                )}
              </div>
            </section>
            <section className="JoinRoom-content">
              <p className="JoinRoom-content_p">{data.data.post.content}</p>
            </section>
          </article>
          <ButtonContainer>
            <Button
              setChats={setChats}
              roomId={data.data.post.id}
              containerName={'JoinRoom'}
            >
              참여하기
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>더미 입니다.</>
      )}
    </Container>
  );
};

export default JoinRoom;
