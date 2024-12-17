import Header from '@/app/components/header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import api from '@/app/services/axiosInstance';
import React, { useEffect, useState } from 'react';
import { 
  PageContainer, 
  Title, 
  CardContainer, 
  Card, 
  CardTitle, 
  CardText, 
  FileLink,
  LoadingMessage, 
  EmptyMessage, 
  GlobalStyle
} from '../app/style/documentsStyle';

interface Document {
  id: number;
  filePath: string;
  extractedText: string | null;
  explanation: string | null;
  createdAt: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get<Document[]>('/documents/list');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <ProtectedRoute>
      <GlobalStyle/>
      <Header />
      <PageContainer>
        <Title>Uploaded Documents</Title>
        {isLoading ? (
          <LoadingMessage>Loading documents...</LoadingMessage>
        ) : documents.length === 0 ? (
          <EmptyMessage>No documents found.</EmptyMessage>
        ) : (
          <CardContainer>
            {documents.map((doc) => (
              <Card key={doc.id}>
                <CardTitle>Document #{doc.id}</CardTitle>
                <CardText>
                  <strong>File Path:</strong>{' '}
                  <FileLink href={doc.filePath} target="_blank" rel="noopener noreferrer">
                    {doc.filePath}
                  </FileLink>
                </CardText>
                <CardText><strong>Extracted Text:</strong> {doc.extractedText || 'Processing...'}</CardText>
                <CardText><strong>LLM Interaction:</strong> {doc.explanation || 'Not available'}</CardText>
                <CardText><strong>Uploaded At:</strong> {new Date(doc.createdAt).toLocaleString()}</CardText>
              </Card>
            ))}
          </CardContainer>
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default DocumentsPage;
