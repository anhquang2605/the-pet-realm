import { Html, Head, Main, NextScript } from 'next/document';
import Header from '../components/sections/header/Header';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
          <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
          rel="stylesheet"
          />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Header />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}