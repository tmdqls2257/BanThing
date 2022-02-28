import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  let cookie: any;

  if (
    typeof document !== 'undefined' &&
    document.cookie.includes('accessToken')
  ) {
    cookie = document.cookie;
  } else {
    cookie = '';
  }

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const storageToken = localStorage.getItem('accessToken');
      if (storageToken === null) {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    }
  }, [cookie]);

  return (
    <>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
