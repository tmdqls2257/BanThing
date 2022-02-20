import '../styles/globals.css';
import Header from '../components/header';
import type { AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
