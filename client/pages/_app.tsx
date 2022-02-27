import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
// import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  let cookie: any;
  let cookieToken: any;

  if (typeof document !== 'undefined') {
    cookie = document.cookie;
    cookieToken = cookie.split('=')[1];
  } else {
    cookie = '';
  }

  useEffect(() => {
    const accessToken: any = localStorage.getItem('accessToken');
    if (cookieToken) {
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
      <ThemeProvider theme={theme}>
        <Component {...pageProps} accessToken={accessToken} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
