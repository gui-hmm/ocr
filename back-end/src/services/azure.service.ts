import { Injectable } from '@nestjs/common';
import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
} from '@azure/storage-blob';

@Injectable()
export class AzureService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;

  constructor() {
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!accountName || !accountKey || !containerName) {
      throw new Error(
        'Azure storage credentials or container name are missing!',
      );
    }

    const blobStorageConnectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;

    this.blobServiceClient = BlobServiceClient.fromConnectionString(
      blobStorageConnectionString,
    );
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const blockBlobClient: BlockBlobClient =
      this.containerClient.getBlockBlobClient(file.originalname);

    try {
      const uploadResponse = await blockBlobClient.upload(
        file.buffer,
        file.buffer.length,
      );

      console.log('Upload response:', uploadResponse);

      const fileUrl = blockBlobClient.url;

      return fileUrl;
    } catch (error) {
      console.error('Error during file upload:', error);
      throw new Error('Erro ao fazer o upload do arquivo para o Azure.');
    }
  }

  async downloadFile(fileName: string): Promise<Buffer> {
    const blockBlobClient: BlockBlobClient =
      this.containerClient.getBlockBlobClient(fileName);

    try {
      const downloadResponse = await blockBlobClient.download();
      const downloadedBuffer = await this.streamToBuffer(
        downloadResponse.readableStreamBody,
      );

      return downloadedBuffer;
    } catch (error) {
      console.error('Error during file download:', error);
      throw new Error('Erro ao fazer o download do arquivo do Azure.');
    }
  }

  private async streamToBuffer(
    readableStream: NodeJS.ReadableStream,
  ): Promise<Buffer> {
    const chunks: any[] = [];
    for await (const chunk of readableStream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  }
}
