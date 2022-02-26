import styled from 'styled-components';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarHeader from '../sidebarHeader/sidebarHeader';
import Chats from '../chats/chats';
import Modal from '../removeModal';

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
  button {
    margin: 0;
    border: none;
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-bold);
    padding: 12px 16px;
    border-radius: 6px;
    color: #ffffff;
    width: 181px;
    background-color: #ff8a3d;
    @media screen and (max-width: 768px) {
      width: 10rem;
    }
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
      console.log(window);
      console.log(localStorage);

      const auth = localStorage.getItem('auth');

      const accessToken = localStorage.getItem('accessToken');
      const cookie = document.cookie.split(';')[1];
      const kakaoToken = cookie.split('=')[1];
      console.log(kakaoToken);

      // const cookie = document.cookie;
      // const cookieList = cookie.split(';');
      // //이렇게 하면 ; 를 기준으로 쿠키들이 나뉘어져 배열화 됩니다.

      // const findAccessToken = cookieList.filter((element) => {
      //   element.includes('accessToken');
      // });
      // //Array.filter 메소드를 통해 accessToken 이라는 String 값이 들어가있는 인자만 찾아냅니다.
      // //findAccessToken 은 ['accessToken=qT_Cy7C-wsgefzvr_f32LU-D5k7OBQHQXb3b3gorDSAAAAF_NUBvmA'] 가 되어있을겁니다.

      // const kakaoToken = findAccessToken[0].split('=')[1];
      // //findAccessToken 의 0번째 인자를 '=' 으로 구분짓고, 그 결과의 1번째 인자는 accessToken입니다.

      // console.log(kakaoToken);
      // console.log(document.cookie);
      // const cookie = document.cookie.split(';')[1];
      // const kakaoToken = cookie.split('=')[1];
      // console.log(kakaoToken);
      if (accessToken || kakaoToken) {
        if (auth === 'banthing') {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            .then((response) => {
              const { userInfo } = response.data.data;
              setNickname(userInfo.nickname);
            });
        } else {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage/kakao`, {
              headers: {
                Authorization: `Bearer ${kakaoToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            })
            .then((response) => {
              const { userInfo } = response.data.data;
              setNickname(userInfo.nickname);
            });
        }
      }
    }
  }, []);

  const onClick = () => {
    const removeModal = document.querySelector('#removeModal')! as HTMLElement;
    removeModal.style.display = 'flex';
  };

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
            <button onClick={onClick}>삭제하기</button>
          </ButtonContainer>
          <Modal removeRoomId={roomsId} />
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
      </Container>
    </>
  );
};

export default ChatRoom;
