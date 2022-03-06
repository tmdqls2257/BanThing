// admin.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Admin.module.css';

axios.defaults.withCredentials = true;

const Admin: NextPage = () => {
  const [userlist, setUserlist] = useState([]);
  const [render, setRender] = useState({});

  // const getUserNickname = (e) => {
  //   console.log(e.target.textContent);
  // };

  const handleDelete = (e) => {
    const nicknameToDelte = e.target.parentNode.lastChild.textContent;
    console.log(nicknameToDelte);
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin/${nicknameToDelte}`,
      )
      .then(() => handleRefresh())
      .catch(console.log);
  };

  const handleRefresh = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`)
      .then((data) => {
        setUserlist(() => data.data);
        console.log(userlist);
      })
      .catch(console.log);
  };
  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.container_container}>
          <div className={styles.container_title}>가입한 유저 목록</div>
          <ul className={styles.container_ul}>
            {userlist.map((el) => {
              const { nickname, isAdmin } = el;
              if (isAdmin) return; // 어드민 계정은 렌더링하지 않음
              return (
                <li key={nickname} className={styles.container_li}>
                  <div
                    onClick={handleDelete}
                    className={styles.container_button}
                  >
                    BAN
                  </div>
                  <div className={styles.container_nickname}>{nickname}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Admin;
