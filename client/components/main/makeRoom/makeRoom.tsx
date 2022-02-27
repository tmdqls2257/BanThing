import SidebarHeader from '../sidebarHeader/sidebarHeader';
import buttonStyle from '../button.module.css';
import styles from './makeRoom.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MakeRoomModal from '../makeRoomModal/makeRoomModal';

interface locationType {
  location: number[];
  setMakeRoom_MapRoomId: (value: number) => void;
}

const MakeRoom = ({ location, setMakeRoom_MapRoomId }: locationType) => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState('');
  const [textarea, setTextarea] = useState('');
  const [radio, setRadio] = useState('');
  const [makeRoomId, setMakeRoomId] = useState(0);
  const [makeRoomModal, setMakeRoomModal] = useState(false);

  useEffect(() => {
    if (makeRoomId !== 0) {
      setMakeRoom_MapRoomId(makeRoomId);
    }
  }, [makeRoomId]);

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setSelect(value);
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const textareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setTextarea(event.target.value);
  };

  const radioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setRadio(event.target.value);
  };

  const data = [
    title,
    select,
    textarea,
    Number(radio),
    String(location[0]),
    String(location[1]),
  ];

  const axiosPost = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('accessToken')) {
        const auth = localStorage.getItem('auth');
        const accessToken = localStorage.getItem('accessToken');
        const cookie = document.cookie.split(';')[1];
        const kakaoToken = cookie.split('=')[1];
        console.log(accessToken);

        if (auth === 'banthing') {
          const headers = {
            Authorization: `Bearer ${accessToken}`,
          };

          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post`,
              {
                title: data[0],
                category: data[1],
                content: data[2],
                host_role: data[3],
                location_latitude: data[4],
                location_longitude: data[5],
              },
              {
                headers,
                withCredentials: true,
              },
            )
            .then((res) => {
              setMakeRoomId(res.data.data.post_id);
            });
        } else {
          const headers = {
            Authorization: `Bearer ${kakaoToken}`,
          };

          axios
            .post(
              `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post/kakao`,
              {
                title: data[0],
                category: data[1],
                content: data[2],
                host_role: data[3],
                location_latitude: data[4],
                location_longitude: data[5],
              },
              {
                headers,
                withCredentials: true,
              },
            )
            .then((res) => {
              setMakeRoomId(res.data.data.post_id);
            });
        }
      }
    }
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    makeRoom.style.display = 'none';
    joinRoom.style.display = 'flex';
  };

  const onClick = () => {
    if (
      title === '' ||
      select === '' ||
      textarea === '' ||
      Number(radio) === 0 ||
      String(location[0]) === '0' ||
      String(location[1]) === '0'
    ) {
      setMakeRoomModal(true);
    } else {
      axiosPost();
    }
  };

  return (
    <section id="MakeRoom" className={styles.MakeRoom}>
      <SidebarHeader containerName={'gotoCreateRoom'}>방 만들기</SidebarHeader>
      <main className={styles.main}>
        <section className={styles.section_flex}>
          <h1 className={styles.h1}>제목</h1>
          <input
            type="text"
            onChange={inputChange}
            className={styles.section_flex_input}
          />
        </section>
        <section className={styles.section_flex}>
          <h1 className={styles.h1}>카테고리</h1>
          <select
            id="choise-foods"
            onChange={selectChange}
            className={styles.section_flex_select}
          >
            <option value=""></option>
            <option value="치킨">치킨</option>
            <option value="햄버거">햄버거</option>
            <option value="피자">피자</option>
            <option value="자장면">자장면</option>
            <option value="커피*디저트">커피*디저트</option>
            <option value="도시락">도시락</option>
            <option value="한식">한식</option>
            <option value="일식">일식</option>
            <option value="분식">분식</option>
          </select>
        </section>
        <section className={styles.host_roll}>
          <h1 className={styles.h1}>역할</h1>
          <select
            id="choise-foods"
            className={styles.host_roll_select}
            onChange={(event) => radioChange(event)}
          >
            <option value=""></option>
            <option value="1">받는 사람</option>
            <option value="2">가지러 가는 사람</option>
          </select>
        </section>
        <section>
          <h1>내용</h1>
          <textarea
            className={styles.content_textarea}
            onChange={textareaChange}
          />
        </section>
      </main>
      <section className={buttonStyle.button_container}>
        <button className={buttonStyle.button} onClick={onClick}>
          참여하기
        </button>
      </section>
      {makeRoomModal ? (
        <MakeRoomModal setMakeRoomModal={setMakeRoomModal} />
      ) : (
        <></>
      )}
    </section>
  );
};

export default MakeRoom;
