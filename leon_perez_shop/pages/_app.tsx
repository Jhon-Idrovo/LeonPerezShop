import RootLayout from "@/components/Layout";
import { AppProps } from "next/app";
import "../globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
      <footer>Footer</footer>
    </RootLayout>
  );
}

export default MyApp;
