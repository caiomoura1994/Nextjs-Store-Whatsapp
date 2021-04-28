import Router from 'next/router';
import { ThemeProvider } from "styled-components";
import { CartProvider } from "react-use-cart";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { theme, GlobalStyle } from "../utils";

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


export default function App({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </ThemeProvider>
    </>
  );
}