import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-size: 62.5%;
        font-synthesis: none;
        color-scheme: dark;
        -webkit-text-size-adjust: 100%;
    }
    
`;

export default GlobalStyle;
