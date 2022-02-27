import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  let cookie: any;
  let cookieToken: any;
  let cookieList: any;

  if (typeof document !== 'undefined') {
    cookie = document.cookie;
    if (cookie.includes(';') && cookie.includes('accessToken')) {
      cookieList = cookie.split(';');
      const findAccessToken = cookieList.filter((cookie: any) => {
        return cookie.includes('accessToken');
      });
      cookieToken = findAccessToken[0].split('=')[1];
    } else if (!cookie.includes(';') && cookie.includes('accessToken')) {
      cookieToken = cookie.split('=')[1];
    }
  } else {
    cookie = '';
  }

  useEffect(() => {
    const accessToken: any = localStorage.getItem('accessToken');
    if (cookieToken && cookie.includes('accessToken')) {
      setIsLogin(true);
      setAccessToken(cookieToken);
      if (accessToken) {
        setAccessToken(accessToken);
      }
    } else {
      setIsLogin(false);
      setAccessToken('');
    }
  }, [cookie]);
  console.log(accessToken);

  return (
    <>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        accessToken={accessToken}
        setAccessToken={setAccessToken}
      />
      <Component {...pageProps} accessToken={accessToken} />
    </>
  );
}

export default MyApp;
