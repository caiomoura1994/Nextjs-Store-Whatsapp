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
      custom_ecommerce: '#cacaca'
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
  .badge {
    padding-left: 9px;
    padding-right: 9px;
    -webkit-border-radius: 9px;
    -moz-border-radius: 9px;
    border-radius: 9px;
  }

  .label-warning[href],
  .badge-warning[href] {
    background-color: #c67605;
  }
  #lblCartCount {
      font-size: 12px;
      background: #ff0000;
      color: #fff;
      padding: 0 5px;
      vertical-align: top;
      margin-left: -10px; 
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  .gradient {
    background: linear-gradient(270deg, rgba(2,169,166,1) 0%, rgba(91,213,144,1) 75%);
  }
  .gradient-color {
    background: -webkit-linear-gradient(270deg, rgba(2,169,166,1) 0%, rgba(91,213,144,1) 75%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .flex {
    display: flex;
  }
  .justify-space-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  ${textClasses}
  ${paddingClasses}
  
`;