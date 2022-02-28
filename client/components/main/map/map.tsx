import styles from './map.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Loading from '../loading/loading';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

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
  maprelandering: boolean;
  setMapToMobileUp: Dispatch<SetStateAction<string>>;
}
function Map({
  setLocation,
  roomsData,
  maprelandering,
  setMapToMobileUp,
}: mapType) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<dataType>();
  const [dummyToken1, setDummyToken1] = useState('');
  const [dummyToken2, setDummyToken2] = useState('');
  const [dummyToken3, setDummyToken3] = useState('');
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
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/dummy`, {
        user_id: 'dummy',
        password: '1234',
      })
      .then((res) => {
        setDummyToken1(res.data.data.accessToken);
      });
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/dummy`, {
        user_id: 'dummy2',
        password: '1234',
      })
      .then((res) => {
        setDummyToken2(res.data.data.accessToken);
      });
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/dummy`, {
        user_id: 'dummy3',
        password: '1234',
      })
      .then((res) => {
        setDummyToken3(res.data.data.accessToken);
      });
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
        setMapToMobileUp('up');
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
              title: '피자 먹을 사람',
              content: '특정 브랜드만 먹습니다.',
              location_latitude: `${lat + 0.001}`,
              location_longitude: `${lon + 0.001}`,
              host_role: 1,
              category: '피자',
              token: dummyToken1,
            },
            {
              title: '햄버거 먹을 사람',
              content: '원하시는 브랜드 먹겠습니다.',
              location_latitude: `${lat - 0.001}`,
              location_longitude: `${lon + 0.001}`,
              host_role: 2,
              category: '햄버거',
              token: dummyToken2,
            },
            {
              title: '치킨 먹을 사람',
              content: '원하시는 브랜드 먹겠습니다.',
              location_latitude: `${lat - 0.002}`,
              location_longitude: `${lon + 0.002}`,
              host_role: 2,
              category: '치킨',
              token: dummyToken3,
            },
          ];

          const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
          };
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
            radius: 200, // 미터 단위의 원의 반지름입니다
            strokeWeight: 5, // 선의 두께입니다
            strokeColor: '#FF8A3D', // 선의 색깔입니다
            strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일 입니다
            fillColor: '#FF8A3D', // 채우기 색깔입니다
            fillOpacity: 0.3, // 채우기 불투명도 입니다
          });
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(lat, lon);
          let marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });
          circle.setMap(map);
          marker.setMap(map);
          if (data) {
            const roomList = data.data.postList;
            for (let i = 0; i < roomList.length; i++) {
              let imageSrc = '';
              if (roomList[i].category === '햄버거') {
                imageSrc = '/image/hamburger.png';
              } else if (roomList[i].category === '치킨') {
                imageSrc = '/image/chicken.png';
              } else if (roomList[i].category === '피자') {
                imageSrc = '/image/pizza.png';
              } else if (roomList[i].category === '한식') {
                imageSrc = '/image/rice.png';
              } else if (roomList[i].category === '자장면') {
                imageSrc = '/image/chNoodles.png';
              } else if (roomList[i].category === '커피*디저트') {
                imageSrc = '/image/coffee.png';
              } else if (roomList[i].category === '도시락') {
                imageSrc = '/image/lunchBox.png';
              } else if (roomList[i].category === '일식') {
                imageSrc = '/image/sushi.png';
              } else if (roomList[i].category === '분식') {
                imageSrc = '/image/tteokbokki.png';
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
            if (typeof window !== 'undefined' && positions[i].token) {
              const headers = {
                Authorization: `Bearer ${positions[i].token}`,
              };
              axios
                .post(
                  `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/post`,
                  {
                    title: positions[i].title,
                    content: positions[i].content,
                    location_latitude: positions[i].location_latitude,
                    location_longitude: positions[i].location_longitude,
                    host_role: positions[i].host_role,
                    category: positions[i].category,
                  },
                  {
                    headers,
                  },
                )
                .then((response) => {
                  console.log('1이라고 합니다.');
                });
            }
            clickEvent(marker, map);
          }
        });
      });
      setLoading(true);
    };
    mapScript.addEventListener('load', onLoadKakaoMap);
    console.log(maprelandering);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [data?.data.postList.length]);

  return (
    <main className={styles.main}>
      <Loading state={loading}></Loading>
      <section id="map" className={styles.map} />
    </main>
  );
}

export default Map;
