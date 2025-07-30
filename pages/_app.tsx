import RootLayout from "./../components/layout";
import { AppProps } from "next/app";
import './../pages/globals.css';
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'] });
export default function App({ Component, pageProps } : AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}