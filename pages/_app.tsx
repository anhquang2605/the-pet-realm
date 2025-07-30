import { AppProps } from "next/app";
import './../pages/globals.css';

export default function Document({ Component, pageProps } : AppProps) {
  return (
      <Component {...pageProps} />
  );
}