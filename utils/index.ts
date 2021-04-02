import { DefaultTheme } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { paddingClasses, textClasses } from "./styles";

export const mediaQueries = {
  sm: '@media (min-width: 640px)', // 640px
  md: '@media (min-width: 768px)', // 768px
  lg: '@media (min-width: 1024px)', // 1024px
  xl: '@media (min-width: 1280px)', // 1280px
  "2xl": '@media (min-width: 1536px)', // 1536px
};

export const theme: DefaultTheme = {
  colors: {
    green: {
      primary: '#a4e9c7',
      light: '#5BD590',
      dark: '#02A9A6',
      custom_store: '#E6F9EE',
    },
    blue: {
      DEFAULT: '#61A0FF',
    },
    red: {
      DEFAULT: '#F12121',
    },
    gray: {
      DEFAULT: '#BCBCBC',
      light: '#FBFBFB',
      dark: '#707070',
      custom_sending: '#F5F5F5',
      custom_ecommerce: '#AAAAAA'
    },
    white: {
      DEFAULT: '#FFFFFF'
    }
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    overflow-y: scroll;
  }
  * {
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  ${textClasses}
  ${paddingClasses}
  
`;