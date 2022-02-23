import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const log = localStorage.getItem('accessToken');
    if (log) {
      setIsLogin(true);
      setAccessToken(log);
    }
  }, []);

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
