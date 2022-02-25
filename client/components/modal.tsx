import axios from 'axios';
import styles from '../styles/Modal.module.css';
import { useRouter } from 'next/router';

interface propsType {
  setIsModalOpen: Function;
  setSignUpModal?: Function;
  type: string;
}

export default function Modal(prop: propsType) {
  const router = useRouter();

  const handleSignout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const accessToken = localStorage.getItem('accessToken');
      const auth = localStorage.getItem('auth');
      if (auth === 'banthing') {
        axios
          .delete(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signout`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            localStorage.removeItem('accessToken');
            prop.setIsModalOpen(false);
            router.push('/');
          });
      } else {
        axios
          .delete(
            `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/kakaoUnlink`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              withCredentials: true,
            },
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleModal = () => {
    if (!prop.setSignUpModal) {
      prop.setIsModalOpen(false);
    } else if (prop.setSignUpModal) {
      prop.setIsModalOpen(false);
      prop.setSignUpModal(false);
    }
  };

  if (prop.type === 'modify') {
    return (
      <>
        <div className={styles.change_password_modal_container}>
          <div className={styles.change_password_modal_body}>
            <div className={styles.change_password_modal_description}>
              <span>비밀번호가 변경되었습니다.</span>
            </div>
            <div className={styles.change_password_modal_button_container}>
              <button
                className={styles.change_password_modal_button}
                onClick={handleModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'mypage_kakao_do_modify') {
    return (
      <>
        <div className={styles.change_password_modal_container}>
          <div className={styles.change_password_modal_body}>
            <div className={styles.change_password_modal_description_kakao}>
              <span>카카오 회원은 마이페이지에서</span>
              <span>비밀번호를 변경할 수 없습니다.</span>
            </div>
            <div className={styles.change_password_modal_button_container}>
              <button
                className={styles.change_password_modal_button}
                onClick={handleModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'signout') {
    return (
      <>
        <div className={styles.signout_modal_container}>
          <div className={styles.signout_modal_body}>
            <div className={styles.signout_modal_description}>
              정말 탈퇴하시겠습니까?
            </div>
            <div className={styles.signout_modal_button_container}>
              <button
                className={styles.signout_modal_yes_button}
                onClick={handleSignout}
              >
                네, 그만 이용하고 싶어요.
              </button>
              <button
                className={styles.signout_modal_no_button}
                onClick={handleModal}
              >
                아니오, 조금 더 이용해볼래요!
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (prop.type === 'signup') {
    return (
      <>
        <div className={styles.signup_modal_container}>
          <div className={styles.signup_modal_body}>
            <div className={styles.signup_modal_description}>
              <span>회원가입이 완료되었습니다!</span>{' '}
              <span>로그인해주세요 :)</span>
            </div>
            <div className={styles.signup_modal_button_container}>
              <button
                className={styles.signup_modal_button}
                onClick={handleModal}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
