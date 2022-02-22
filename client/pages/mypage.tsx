import { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/MyPage.module.css';
import { useState } from 'react';

const MyPage: NextPage = () => {
  const isSmallLetterAndNumber4to10 = /^[a-z0-9]{4,10}$/;

  const [changePassword, setChangePassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [correctChangePassword, setCorrectChangePassword] = useState(true);
  const [correctCheckPassword, setCorrectCheckPassword] = useState(true);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangePassword(event.target.value);
  };

  const handleCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const type: string = event.target.id;

    if (type === 'change_password') {
      if (!value) {
        setCorrectChangePassword(true);
      } else if (isSmallLetterAndNumber4to10.test(value)) {
        setCorrectChangePassword(true);
      } else {
        setCorrectChangePassword(false);
      }
    }

    if (!correctChangePassword) {
      setCorrectCheckPassword(true);
    } else {
      if (changePassword === '') {
        setCorrectCheckPassword(true);
      } else if (type === 'check_password') {
        if (!value) {
          setCorrectCheckPassword(true);
        } else if (changePassword === checkPassword) {
          setCorrectCheckPassword(true);
        } else {
          setCorrectCheckPassword(false);
        }
      }
    }
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
          <div className={styles.mypage_score_container}>
            <div className={styles.mypage_score_description}>나의 평점</div>
            <div className={styles.mapage_score}>
              9.6<span>{`(${12})`}</span>
            </div>
          </div>
          <div className={styles.mypage_input_container}>
            <div className={styles.mypage_input_disabled}>
              <input
                className={styles.mypage_id_name}
                placeholder="아이디"
                disabled
              />
              <input
                className={styles.mypage_id_name}
                placeholder="닉네임"
                disabled
              />
            </div>
            <input
              id="change_password"
              className={styles.mypage_password_change_check}
              placeholder="변경할 비밀번호 입력"
              type="password"
              onChange={handleChangePassword}
              onBlur={handleBlur}
            />
            {correctChangePassword ? (
              <span className={styles.mypage_space}>
                4~10자 영어 소문자, 숫자를 사용하였습니다.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                4~10자 영어 소문자, 숫자를 사용하세요.
              </span>
            )}
            <input
              id="check_password"
              className={styles.mypage_password_change_check}
              placeholder="변경할 비밀번호 확인"
              type="password"
              onChange={handleCheckPassword}
              onBlur={handleBlur}
            />
            {correctCheckPassword ? (
              <span className={styles.mypage_space}>
                비밀번호가 일치합니다.
              </span>
            ) : (
              <span className={styles.mypage_error}>
                비밀번호가 일치하지 않습니다.
              </span>
            )}
          </div>
          <div className={styles.mypage_button_container}>
            <button className={styles.mypage_modify_button}>수정하기</button>
            <button className={styles.mypage_signout_button}>회원탈퇴</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
