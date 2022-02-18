import styled from 'styled-components';
import Script from 'next/script';
import { NextPage } from 'next';
import Map from '../components/main/map';
import Sidebar from '../components/main/sidebar';

declare global {
  interface Window {
    kakao: any;
  }
}
const Container = styled.div`
  padding-top: 4.6vw;
  display: flex;
  flex-direction: row;
  width: 100;
  height: 100vh;
`;

const Main: NextPage = () => {
  return (
    <>
      <Script
        src="https://kit.fontawesome.com/026077c6cc.js"
        crossOrigin="anonymous"
      ></Script>
      <Container>
        <Map latitude={33.450701} longitude={126.570667} />
        <Sidebar />
      </Container>
    </>
  );
};
export default Main;
