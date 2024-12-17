import React, { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import api from '@/app/services/axiosInstance';
import { 
  DocumentCard, 
  DocumentListContainer, 
  DocumentName, 
  DownloadButton, 
  GlobalStyle, 
  LoadingMessage, 
  PageContainer, 
  Title 
} from '../app/style/downloadStyle';

interface Document {
  id: number;
  filePath: string;
  extractedText: string | null;
  explanation: string | null;
  createdAt: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get<Document[]>('/documents/list-names');
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = async (documentId: number) => {
    try {
      const response = await api.get<Blob>(`/documents/download/${Number(documentId)}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document_${documentId}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <Header />
        <PageContainer>
          <LoadingMessage>Loading documents...</LoadingMessage>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <GlobalStyle/>
      <Header />
      <PageContainer>
        <Title>Your Documents</Title>
        {documents.length === 0 ? (
          <LoadingMessage>No documents found.</LoadingMessage>
        ) : (
          <DocumentListContainer>
            {documents.map((doc) => (
              <DocumentCard key={doc.id}>
                <DocumentName>{doc.filePath.split('/').pop()}</DocumentName>
                <DownloadButton onClick={() => handleDownload(doc.id)}>
                  Download
                </DownloadButton>
              </DocumentCard>
            ))}
          </DocumentListContainer>
        )}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default DocumentList;
