// admin.tsx
import { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Admin.module.css';

axios.defaults.withCredentials = true;

const Admin: NextPage = () => {
  const [userlist, setUserlist] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/admin`)
      .then((data) => {
        setUserlist(data.data);
      });
  });

  const handleDelete = (e) => {
    console.log(e.target);
  };

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.container_container}>
          가입한 유저 목록
          <ul>
            {userlist.map((el) => {
              const { nickname, auth } = el;
              return (
                <li key={nickname} onClick={handleDelete}>
                  <div onClick={handleDelete}>{nickname}</div>
                  <div>{auth}</div>
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
