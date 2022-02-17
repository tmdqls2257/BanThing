import styled from "styled-components";
import Script from "next/script";
import { NextPage } from "next";
import Map from "../components/main/map";
import Sidebar from "../components/main/sidebar";
declare global {
  interface Window {
    kakao: any;
  }
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const main: NextPage = () => {
  return (
    <>
      <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=b016fe9afbd6ea131434b96cd099e6d0&autoload=false"></Script>
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
export default main;
