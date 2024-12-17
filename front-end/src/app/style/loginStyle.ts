import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    font-family: 'Arial', sans-serif;
  }
`;

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    background-color: #ecf1f6;
    padding-top: 40px;
    margin: 0;
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px; 
    text-align: center;
`;

export const ContainerInputs = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
`;

export const TextInput = styled.div`
    font-size: 16px;
    color: #949494;
    margin-bottom: 5px;
`;

export const Input = styled.input`
    width: 250px;
    height: 30px;
    margin-bottom: 15px;
    border-radius: 10px;
    padding-left: 8px;

    &::placeholder{
        padding-left: 5px;
    }
`;

export const ContainerText = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

export const Text = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #2C3E50;
`;

export const Text1 = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: #2C3E50;
    text-decoration: underline;
    margin-left: 5px;
    cursor: pointer;
`;

export const LoginButton = styled.button`
    width: 80px;
    height: 35px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #2C3E50;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    transition: 0.5s;
    border: none;

    &:hover{
        background-color: #2C3E50CC;
    }
`;