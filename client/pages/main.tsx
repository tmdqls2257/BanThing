import styled from 'styled-components';
import styles from '../styles/main/main.module.css';
import Head from 'next/head';
import Script from 'next/script';
import { NextPage } from 'next';
import Map from '../components/main/map/map';
import Sidebar from '../components/main/sidebar/sidebar';
import { useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}
const Container = styled.div`
  padding-top: 4.6vw;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;
const InsideContainer = styled.div`
  overflow-y: auto;
  display: flex;
`;
const Main: NextPage = () => {
  const [location, setLocation] = useState<number[]>([]);
  const [roomsId, setRoomsData] = useState(0);

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        src="https://kit.fontawesome.com/026077c6cc.js"
        crossOrigin="anonymous"
      ></Script>
      <section className={styles.section}>
        <main className={styles.main}>
          <Map roomsData={setRoomsData} setLocation={setLocation} />
          <Sidebar location={location} roomsId={roomsId} />
        </main>
      </section>
    </>
  );
};
export default Main;
