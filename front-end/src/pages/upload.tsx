import Header from '@/app/components/header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import api from '@/app/services/axiosInstance';
import React, { useState } from 'react';
import { 
  Container, 
  ContainerTexts, 
  ContainerTextsAll, 
  ErrorText, 
  ExtractText, 
  FileInfo, 
  FileInputContainer, 
  FileInputLabel, 
  GlobalStyle, 
  HiddenInput, 
  LabelInput, 
  Loader, 
  ProgressBar, 
  ProgressBarContainer, 
  SuccessText, 
  Title, 
  TitleTexts, 
  UploadButton 
} from '../app/style/uploadStyle';

type UploadResponse = {
  message: string;
  document: {
    id: number;
    filePath: string;
    extractedText?: string;
    explanation?: string;
  };
};

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [llmExplanation, setLlmExplanation] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setMessage('Unsupported file type.');
        return;
      }
      setFile(selectedFile);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      setIsUploading(true);
      setMessage(null);
      setLlmExplanation(null);
  
      const response = await api.post<UploadResponse>(
        '/documents/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log('API Response:', response.data);
  
      const { document } = response.data;
      if (document?.explanation || document?.extractedText) {
        setExtractedText(document.extractedText || 'No extracted text available.');
        setLlmExplanation(document.explanation || 'No explanation available.');
        setMessage('File uploaded successfully!');
      } else {
        throw new Error('Explanation or extracted text not found in API response.');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setMessage(error.response?.data?.message || 'Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };  

  return (
    <ProtectedRoute>
      <GlobalStyle/>
      <Header />
      <Container>
        <Title>Upload File</Title>
        
        <FileInputContainer>
          <FileInputLabel htmlFor="fileInput">Choose File</FileInputLabel>
          <HiddenInput id="fileInput" type="file" onChange={handleFileChange} />
        </FileInputContainer>

        <FileInfo>
          {file && (
            <>
              <span>Selected File: <strong>{file.name}</strong></span>
              <span>Size: {(file.size / 1024).toFixed(2)} KB</span>
            </>
          )}
        </FileInfo>

        <UploadButton 
          onClick={handleUpload} 
          disabled={isUploading || !file}
          isUploading={isUploading}
          aria-busy={isUploading}
        >
          {isUploading ? <Loader /> : 'Upload'}
        </UploadButton>

        <ProgressBarContainer>
          {isUploading && <ProgressBar />}
        </ProgressBarContainer>

        {message && (
          <div>
            {message.includes('Error') ? (
              <ErrorText>{message}</ErrorText>
            ) : (
              <SuccessText>{message}</SuccessText>
            )}
          </div>
        )}

        {extractedText || llmExplanation ? (
          <ContainerTextsAll>
            <ContainerTexts>
              <TitleTexts>Extracted Text:</TitleTexts>
              <ExtractText>{extractedText || 'No extracted text available.'}</ExtractText>
            </ContainerTexts>
            <ContainerTexts>
              <TitleTexts>LLM Explanation:</TitleTexts>
              <ExtractText>{llmExplanation || 'No explanation available.'}</ExtractText>
            </ContainerTexts>
          </ContainerTextsAll>
        ) : (
          <ExtractText>No extracted text or explanation available.</ExtractText>
        )}
      </Container>
    </ProtectedRoute>
  );
};

export default UploadPage;
