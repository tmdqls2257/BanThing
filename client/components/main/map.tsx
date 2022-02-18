import styled from 'styled-components';
import { useEffect } from 'react';
import { createElement, joinRoom } from './querySelector';

const MapContainer = styled.div`
  display: flex;
  width: 70vw;
  height: auto;
  @media screen and (max-width: 768px) {
    width: 100vw;
    height: auto;
  }
`;

function Map() {
  // const positions = [
  //   {
  //     latlng: new window.kakao.maps.LatLng(35.169222, 126.806048),
  //   },
  //   {
  //     latlng: new window.kakao.maps.LatLng(35.168428, 126.805479),
  //   },
  //   {
  //     latlng: new window.kakao.maps.LatLng(35.166637, 126.81332),
  //   },
  //   {
  //     latlng: new window.kakao.maps.LatLng(35.171877, 126.808983),
  //   },
  // ];

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(mapScript);

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
          window.kakao.maps.event.addListener(marker, 'click', function () {
            createElement.style.display = 'none';
            joinRoom.style.display = 'flex';
          });
          window.kakao.maps.event.addListener(
            map,
            'click',
            function (mouseEvent: React.MouseEvent) {
              joinRoom.style.display = 'none';
              createElement.style.display = 'flex';
            },
          );
          // for (let i = 0; i < positions.length; i++) {
          //   // 마커를 생성합니다
          //   marker = new window.kakao.maps.Marker({
          //     map: map, // 마커를 표시할 지도
          //     position: positions[i].latlng, // 마커의 위치
          //   });
          // }
        });
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return <MapContainer id="map" />;
}

export default Map;
