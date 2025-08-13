import { AppProps } from "next/app";
import './../pages/globals.css';
import Layout from "../components/sections/layout/layout";

export default function Document({ Component, pageProps } : AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}