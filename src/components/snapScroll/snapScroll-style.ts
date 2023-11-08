import styled from "styled-components";

export const Container = styled.div`
    // position: fixed;
    height: 300vh;
    width: 100vw;
    // top: 0;
    will-change: transform;

    img {
        height: 100%;
        width: auto;
        position: absolute;
        left: 50%;
        right: 50%;
        transform: translate(-50%);
        background-position: center center;
        background-size: cover;
        visibility: hidden;
    }
`;

// export const Container = styled.div``