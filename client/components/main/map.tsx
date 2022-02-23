import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Loading from './loading';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

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

interface dataType {
  data: {
    postList: [
      {
        category: string;
        id: number;
        location_latitude: string;
        location_longitude: string;
      },
    ];
  };
}
interface mapType {
  setLocation: Dispatch<SetStateAction<number[]>>;
  roomsData: Dispatch<SetStateAction<number>>;
}
function Map({ setLocation, roomsData }: mapType) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<dataType>();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/main`,
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getPosts();
  }, []);

  useEffect(() => {
    const mapScript = document.createElement('script');
    const createElement = document.querySelector('#CreateRoom')! as HTMLElement;
    const joinRoom = document.querySelector('#JoinRoom')! as HTMLElement;
    const makeRoom = document.querySelector('#MakeRoom')! as HTMLElement;
    const chatRoom = document.querySelector('#ChatRoom')! as HTMLElement;

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const clickEvent = (marker: any, map: any, roomId?: number) => {
      window.kakao.maps.event.addListener(marker, 'click', function () {
        createElement.style.display = 'none';
        chatRoom.style.display = 'none';
        makeRoom.style.display = 'none';
        joinRoom.style.display = 'flex';
        if (roomId) {
          roomsData(roomId);
        }
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
          setLocation([lat, lon]);
          const positions = [
            {
              lat: lat + 0.001,
              lon: lon + 0.002,
              imageSrc:
                'https://cdn.discordapp.com/attachments/934007459763326976/945616034247888966/unknown.png',
            },
            {
              lat: lat - 0.001,
              lon: lon - 0.002,
              imageSrc:
                'https://cdn.discordapp.com/attachments/934007459763326976/945616608909475850/unknown.png',
            },
            {
              lat: lat + 0.001,
              lon: lon - 0.001,
              imageSrc:
                'https://cdn.discordapp.com/attachments/934007459763326976/945617088049975296/unknown.png',
            },
          ];

          const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
          };
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(lat, lon);
          let marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
          if (data) {
            const roomList = data.data.postList;
            for (let i = 0; i < roomList.length; i++) {
              let imageSrc = '';
              if (roomList[i].category === '햄버거') {
                imageSrc =
                  'https://cdn.discordapp.com/attachments/934007459763326976/945616034247888966/unknown.png'; // 마커이미지의 주소입니다
              } else if (roomList[i].category === '치킨') {
                imageSrc =
                  'https://cdn.discordapp.com/attachments/934007459763326976/945616608909475850/unknown.png';
              } else if (roomList[i].category === '피자') {
                imageSrc =
                  'https://cdn.discordapp.com/attachments/934007459763326976/945617088049975296/unknown.png';
              }
              const imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
                imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize,
                imageOption,
              );

              // 마커를 생성합니다
              marker = new window.kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: new window.kakao.maps.LatLng(
                  roomList[i].location_latitude,
                  roomList[i].location_longitude,
                ), // 마커의 위치
                image: markerImage,
              });
              clickEvent(marker, map, roomList[i].id);
            }
          }
          // data로 변경 예정
          for (let i = 0; i < positions.length; i++) {
            // data category가 치킨을 경우 치킨 이미지
            const imageSrc = positions[i].imageSrc, // 마커이미지의 주소입니다
              imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
              imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            const markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imageOption,
            );
            // 마커를 생성합니다
            marker = new window.kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: new window.kakao.maps.LatLng(
                positions[i].lat,
                positions[i].lon,
              ), // 마커의 위치
              image: markerImage,
            });
            clickEvent(marker, map);
          }
        });
      });
      setLoading(true);
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [data?.data.postList.length]);

  return (
    <>
      <Loading state={loading}></Loading>
      <MapContainer id="map" />
    </>
  );
}

export default Map;
