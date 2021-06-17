import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      green: {
        primary: string;
        light: string;
        dark: string;
        custom_store: string;
      },
      blue: {
        DEFAULT: string;
        dark: string;
      },
      red: {
        DEFAULT: string;
      },
      gray: {
        DEFAULT: string;
        light: string;
        dark: string;
        custom_sending: string;
        custom_ecommerce: string;
      },
      white: {
        DEFAULT: string;
      }
    }
  }
}