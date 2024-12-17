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

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    background-color: #ecf1f6;
    padding: 40px;
    margin: 50px auto 0;
`;

export const Title = styled.h1`
    font-weight: bold;
    font-size: 40px;
    color: #2c3e50;
    margin-bottom: 20px; 
    text-align: center;
`;

export const FileInputContainer = styled.div`
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileInputLabel = styled.label`
  display: inline-block;
  padding: 12px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const LabelInput = styled.label`
    margin: 15px;
`;

export const UploadButton = styled.button<{ isUploading: boolean }>`
    margin-top: 20px;
    padding: 12px 20px;
    font-size: 1.1rem;
    color: #fff;
    background-color: ${({ isUploading }) => (isUploading ? '#95a5a6' : '#3498db')}; /* Cor dinâmica */
    border: none;
    border-radius: 4px;
    cursor: ${({ isUploading }) => (isUploading ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s ease, transform 0.2s ease;
    
    &:hover {
        background-color: ${({ isUploading }) => (isUploading ? '#95a5a6' : '#2980b9')};
        transform: ${({ isUploading }) => (isUploading ? 'none' : 'scale(1.05)')};
    }

    &:disabled {
        opacity: 0.4;
    }
`;

export const FileInfo = styled.div`
  margin: 10px 0;
  font-size: 14px;
  color: #333;
  span {
    display: block;
  }
`;

export const ProgressBarContainer = styled.div`
  margin: 15px 0;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #4caf50;
  animation: progressAnimation 2s linear infinite;
  @keyframes progressAnimation {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

export const ContainerTextsAll = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 30px;
    justify-content: space-between;
`;

export const ContainerTexts = styled.div`
    flex: 1 1 45%;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.3s ease, transform 0.2s ease;

    &:hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
        transform: scale(1.02);
    }
`;

export const TitleTexts = styled.h3`
    font-weight: bold;
    font-size: 1.3rem;
    color: #34495e;
    margin-bottom: 10px;
`;

export const ExtractText = styled.p`
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 1rem;
    color: #7f8c8d;
    line-height: 1.6;
`;

export const ErrorText = styled.p`
    margin-top: 10px;
    color: red;
    font-size: 1rem;
`;

export const SuccessText = styled.p`
    margin-top: 10px;
    color: green;
    font-size: 1rem;
`;

