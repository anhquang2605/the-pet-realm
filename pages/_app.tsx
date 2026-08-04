import { AppProps } from "next/app";
import './globals.css';
import Layout from "../components/sections/layout/layout";


export default function Document({ Component, pageProps } : AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}