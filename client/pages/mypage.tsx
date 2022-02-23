import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/MyPage.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../components/modal';

const MyPage: NextPage = () => {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;

  const [changePassword, setChangePassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [correctChangePassword, setCorrectChangePassword] = useState(true);
  const [correctCheckPassword, setCorrectCheckPassword] = useState(true);

  const [changePasswordMessage, setChangePasswordMessage] = useState('');
  const [checkPasswordMessage, setCheckPasswordMessage] = useState('');

  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const accessToken = localStorage.getItem('accessToken');
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        })
        .then((response) => {
          const { userInfo } = response.data.data;
          setUserId(userInfo.user_id);
          setNickname(userInfo.nickname);
        });
    }
  }, []);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectChangePassword(true);
    setChangePassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCorrectCheckPassword(true);
    setCheckPassword(event.target.value);
  };

  const handleModify = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (changePassword === '' || checkPassword === '') {
      if (changePassword === '') {
        setChangePasswordMessage('필수 정보입니다.');
        setCorrectChangePassword(false);
      }
      if (checkPassword === '') {
        setCheckPasswordMessage('필수 정보입니다.');
        setCorrectCheckPassword(false);
      }
    } else if (correctChangePassword && correctCheckPassword) {
      if (typeof window !== 'undefined' && window.localStorage) {
        const accessToken = localStorage.getItem('accessToken');
        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/mypage`,
            {
              password: changePassword,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                withCredentials: true,
              },
            },
          )
          .then((response) => {
            setChangePassword('');
            setCheckPassword('');
            console.log(response);
          });
      }
    }
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'change_password') {
      if (!value) {
        setCorrectChangePassword(true);
      } else if (!isSmallLetterAndNumber4to10.test(value)) {
        setChangePasswordMessage('4~10자 영어 소문자, 숫자를 사용하세요.');
        setCorrectChangePassword(false);
      } else {
        setCorrectChangePassword(true);
      }
    }

    if (type === 'check_password') {
      if (!value) {
        setCorrectCheckPassword(true);
      } else if (changePassword !== checkPassword) {
        if (changePassword === '' || !correctChangePassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCheckPasswordMessage('비밀번호가 일치하지 않습니다.');
          setCorrectCheckPassword(false);
        }
      } else if (changePassword === checkPassword) {
        if (!correctChangePassword) {
          setCheckPasswordMessage('비밀번호를 양식에 맞춰 작성해주세요.');
          setCorrectCheckPassword(false);
        } else {
          setCorrectCheckPassword(true);
        }
      }
    }
  };

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>BanThing</title>
        <meta name="BanThing" content="Order with your foodmate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.mypage_container}>
        <div className={styles.mypage_profile}>
          <img
            src="/user.png"
            alt="user-image"
            className={styles.mypage_image}
          />
          {/* <div className={styles.mypage_score_container}>
            <div className={styles.mypage_score_description}>나의 평점</div>
            <div className={styles.mapage_score}>
              9.6<span>{`(${12})`}</span>
            </div>
          </div> */}
          <div className={styles.mypage_input_container}>
            <div className={styles.mypage_input_disabled}>
              <input
                className={styles.mypage_id_name}
                placeholder={userId}
                disabled
              />
              <input
                className={styles.mypage_id_name}
                placeholder={nickname}
                disabled
              />
            </div>
            <input
              id="change_password"
              className={styles.mypage_password_change_check}
              placeholder="변경할 비밀번호 입력"
              type="password"
              value={changePassword}
              onChange={handleChangePassword}
              onBlur={handleBlur}
            />
            {correctChangePassword ? (
              <span className={styles.mypage_space}>
                올바르게 작성되었습니다.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                {changePasswordMessage}
              </span>
            )}
            <input
              id="check_password"
              className={styles.mypage_password_change_check}
              placeholder="변경할 비밀번호 확인"
              type="password"
              value={checkPassword}
              onChange={handleCheckPassword}
              onBlur={handleBlur}
            />
            {correctCheckPassword ? (
              <span className={styles.mypage_space}>
                올바르게 작성되었습니다.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                {checkPasswordMessage}
              </span>
            )}
          </div>
          <div className={styles.mypage_button_container}>
            <button
              className={styles.mypage_modify_button}
              onClick={handleModify}
            >
              수정하기
            </button>
            <button
              className={styles.mypage_signout_button}
              onClick={handleModal}
            >
              회원탈퇴
            </button>
          </div>
        </div>
        {isModalOpen ? <Modal setIsModalOpen={setIsModalOpen} /> : <></>}
      </div>
    </>
  );
};

export default MyPage;
