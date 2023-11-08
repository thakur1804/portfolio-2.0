import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap');

    *, *::before, *::after{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Poppins', sans-serif;
        font-size: 62.5%;
        font-synthesis: none;
        color-scheme: dark;
        -webkit-text-size-adjust: 100%;
    }
`;

export default GlobalStyle;
