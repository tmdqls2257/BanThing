import styled from 'styled-components';
import { useEffect } from 'react';
import Loading from './loading';
import { useState } from 'react';

const MapContainer = styled.div`
  display: flex;
  width: 70vw;
  height: auto;
  min-height: 715px;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: auto;
  }
`;

const positions = [
  {
    lat: 35.169222,
    lon: 126.806048,
  },
  {
    lat: 35.168428,
    lon: 126.805479,
  },
  {
    lat: 35.166637,
    lon: 126.81332,
  },
  {
    lat: 35.171877,
    lon: 126.808983,
  },
];

function Map() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const mapScript = document.createElement('script');
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const clickEvent = (marker: any, map: any) => {
      window.kakao.maps.event.addListener(marker, 'click', function () {
        createElement.style.display = 'none';
        chatRoom.style.display = 'none';
        makeRoom.style.display = 'none';
        joinRoom.style.display = 'flex';
      });
      window.kakao.maps.event.addListener(map, 'click', function () {
        joinRoom.style.display = 'none';
        makeRoom.style.display = 'none';
        createElement.style.display = 'flex';
        chatRoom.style.display = 'none';
      });
    };

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
          const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
          };
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(lat, lon);
          let marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          clickEvent(marker, map);
          for (let i = 0; i < positions.length; i++) {
            // 마커를 생성합니다
            marker = new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new window.kakao.maps.LatLng(
                positions[i].lat,
                positions[i].lon,
              ), // 마커의 위치
            });
            clickEvent(marker, map);
          }
        });
      });
      setLoading(true);
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <>
      <Loading state={loading}></Loading>
      <MapContainer id="map" />
    </>
  );
}

export default Map;
