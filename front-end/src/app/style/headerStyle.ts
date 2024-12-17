import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100px;
    justify-content: space-around;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: #2C3E50;

    @media (max-width: 768px) {
        /* Para tablets */
        flex-direction: column;
        align-items: center;
        height: auto;
    }
`;

export const IconsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 800px;
    height: auto;

    @media (max-width: 768px) {
        /* Para tablets */
        flex-direction: column;
        justify-content: center;
        padding-bottom: 10px;
    }
`;

export const IconsPages = styled.div`
    cursor: pointer;
    display: flex;
    color: #FFF;
    font-size: larger;

    &:hover {
        color: #000000;
    }
`;  