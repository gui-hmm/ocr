import styled from 'styled-components';
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
  min-height: 100vh;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: #ecf1f6;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 40px;
  color: #2c3e50;
  text-align: center;
  margin: 80px auto 10px;
`;

export const DocumentListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
`;

export const DocumentCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const DocumentName = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  word-break: break-word;
  margin-bottom: 1rem;
`;

export const DownloadButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const LoadingMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
`;