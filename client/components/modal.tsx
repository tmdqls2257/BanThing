import axios from 'axios';
import styles from '../styles/Modal.module.css';
import { NextResponse, NextRequest } from 'next/server';

interface propsType {
  setIsModalOpen: Function;
}

export async function middleware() {
  return NextResponse.redirect('/');
}

export default function Modal(prop: propsType) {
  const handleSignout = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const accessToken = localStorage.getItem('accessToken');
      axios
        .delete(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/users/signout`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            withCredentials: true,
          },
        })
        .then((response) => {
          console.log(response);
          localStorage.removeItem('accessToken');
          prop.setIsModalOpen(false);
          return NextResponse.redirect('/');
        });
    }
  };

  const handleModal = () => {
    prop.setIsModalOpen(false);
  };

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
