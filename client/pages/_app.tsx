import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
// import GlobalStyle from '../styles/GlobalStyle';
// import { ThemeProvider } from 'styled-components';
// import { theme } from '../styles/theme';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);

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
    cookieToken = '';
  }

  useEffect(() => {
    if (cookieToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
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
