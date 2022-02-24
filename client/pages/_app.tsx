import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  let cookie: any;

  if (typeof document !== 'undefined') {
    cookie = document.cookie;
  } else {
    cookie = '';
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && cookie) {
      setIsLogin(true);
      setAccessToken(accessToken);
    } else {
      setIsLogin(false);
      setAccessToken('');
    }
  }, [cookie]);

  return (
    <>
      <GlobalStyle />
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
