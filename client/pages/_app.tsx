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
  let inner: string;

  if (typeof document !== 'undefined') {
    cookie = document.cookie; //document.cookie = X
    console.log(cookie);

    if (
      cookie.includes(';') &&
      (cookie.includes('accessToken') || cookie.includes('inner'))
    ) {
      cookieList = cookie.split(';');
      const findInner = cookieList.filter((cookie: any) => {
        return cookie.includes('inner=true');
      });
      inner = findInner[0].split('=')[1];
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
