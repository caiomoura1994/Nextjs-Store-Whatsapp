import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "../utils";
import { CartProvider } from "react-use-cart";

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