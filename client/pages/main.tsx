import styles from '../styles/main/main.module.css';
import Head from 'next/head';
import Script from 'next/script';
import { NextPage } from 'next';
import Map from '../components/main/map/map';
import Sidebar from '../components/main/sidebar/sidebar';
import { useEffect, useState } from 'react';
import AxiosClient from '../axios';
import { io, Socket } from 'socket.io-client';
import Alarm from '../components/main/alarm/alarm';
import '@firebase/messaging';

declare global {
  interface Window {
    kakao: any;
  }
}

const baseURL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT!;
const socket: Socket = io('http://localhost:5000');
const httpClient = new AxiosClient(baseURL);

try {
  Notification.requestPermission();
} catch (err) {
  console.log(err);
}
const Main: NextPage = () => {
  const [location, setLocation] = useState<number[]>([]);
  const [roomsId, setRoomsData] = useState(0);
  const [alarmNumber, setAlarmNumber] = useState(0);
  useEffect(() => {
    console.log(alarmNumber);
  }, [alarmNumber]);

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Script
        src="https://kit.fontawesome.com/026077c6cc.js"
        crossOrigin="anonymous"
      ></Script>
      <section className={styles.section}>
        <main className={styles.main} id={'mainPage'}>
          {/* <Alarm /> */}
          <Map
            roomsData={setRoomsData}
            setLocation={setLocation}
            httpClient={httpClient}
          />
          <Sidebar
            alarmNumber={alarmNumber}
            setAlarmNumber={setAlarmNumber}
            socket={socket}
            location={location}
            roomsId={roomsId}
            httpClient={httpClient}
          />
        </main>
      </section>
    </>
  );
};
export default Main;
