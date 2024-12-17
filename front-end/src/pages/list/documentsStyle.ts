import styled from "styled-components";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    max-width: 100%;
    overflow-x: hidden;
    font-family: 'Arial', sans-serif;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #ecf1f6;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin: 80px auto 20px;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  overflow-wrap: break-word;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
  color: #555;
  strong {
    color: #222;
  }
`;

export const CardText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin: 5px 0;
`;

export const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #777;
`;

export const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #aaa;
  text-align: center;
  margin-top: 20px;
`;

export const FileLink = styled.a`
  color: #007bff;
  text-decoration: none;
  word-break: break-word;
  &:hover {
    text-decoration: underline;
  }
`;