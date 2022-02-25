import Button from './button';
import SidebarHeader from './sidebarHeader/sidebarHeader';
import styled from 'styled-components';
import Modal from './removeModal';
import Chats from './chats';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  /* 컴포넌트를 보고 싶다면 display: flex; 바꿔주세요 */
  display: none;
  flex-direction: column;
  min-height: 715px;
  width: 30vw;
  min-width: 400px;
  main {
    background-color: var(--chat-background-color);
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: var(--margine-base) auto;
  div {
    margin: 0 4px;
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

interface roomsIdTitleType {
  roomsId: number;
  roomTitle: string;
  usersChats: usersChats | undefined;
  roomHostNickName: string;
}

const ChatRoom = ({
  usersChats,
  roomTitle,
  roomsId,
  roomHostNickName,
}: roomsIdTitleType) => {
  const [usernickname, setNickname] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        })
        .then((response) => {
          const { userInfo } = response.data.data;
          setNickname(userInfo.nickname);
        });
    }
  }, []);
  console.log(roomsId);

  if (usernickname === roomHostNickName) {
    return (
      <>
        <Container id="ChatRoom">
          <SidebarHeader containerName={'gotoJoinRoom'}>
            {roomTitle}
          </SidebarHeader>
          <main>
            <Chats
              usernickname={usernickname}
              usersChats={usersChats}
              roomsId={roomsId}
              addable={true}
            ></Chats>
          </main>
          <ButtonContainer>
            <div>
              <Button containerName={'삭제하기'}>삭제하기</Button>
            </div>
          </ButtonContainer>
          <Modal />
        </Container>
      </>
    );
  }
  return (
    <>
      <Container id="ChatRoom">
        <SidebarHeader containerName={'gotoJoinRoom'}>
          {roomTitle}
        </SidebarHeader>
        <main>
          <Chats
            usernickname={usernickname}
            usersChats={usersChats}
            roomsId={roomsId}
            addable={true}
          ></Chats>
        </main>
        <Modal />
      </Container>
    </>
  );
};

export default ChatRoom;
