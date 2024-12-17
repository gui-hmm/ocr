import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { AzureService } from 'src/services/azure.service';
import { JwtService } from '@nestjs/jwt';
import * as Tesseract from 'tesseract.js';
import * as pdfParse from 'pdf-parse';
import * as Mammoth from 'mammoth';
import axios from 'axios';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly azureService: AzureService,
  ) {}

  private readonly llmApiUrl =
    'https://api-inference.huggingface.co/models/bigscience/bloom';
  private readonly llmApiKey = process.env.HUGGING_FACE_API_KEY;

  private async extractText(
    fileUrl: string,
    mimeType: string,
  ): Promise<string> {
    if (mimeType === 'application/pdf') {
      return this.extractTextFromPDF(fileUrl);
    } else if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
      return this.extractTextFromImage(fileUrl);
    } else if (
      mimeType === 'application/msword' ||
      mimeType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return this.extractTextFromWord(fileUrl);
    } else {
      throw new Error('Unsupported file type');
    }
  }

  private async extractTextFromPDF(fileUrl: string): Promise<string> {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const dataBuffer = Buffer.from(response.data);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  }

  private async extractTextFromImage(fileUrl: string): Promise<string> {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const {
      data: { text },
    } = await Tesseract.recognize(buffer, 'eng');
    return text;
  }

  private async extractTextFromWord(fileUrl: string): Promise<string> {
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
    const fileBuffer = Buffer.from(response.data);

    const result = await Mammoth.extractRawText({ buffer: fileBuffer });
    return result.value;
  }

  private async getExplanationFromLLM(text: string): Promise<string> {
    if (!text) {
      throw new Error('No text provided for explanation');
    }

    try {
      const prompt = `Explain the content of the text below in a clear and simple manner:\n${text}\n\n`;
      const response = await axios.post(
        this.llmApiUrl,
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer ${this.llmApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return (
        response.data?.[0]?.generated_text.trim() ||
        'Error obtaining explanation'
      );
    } catch (error) {
      console.error(
        'Error interacting with the LLM:',
        error.response?.data || error,
      );
      throw new Error('Failed to obtain explanation from the language model');
    }
  }

  async uploadFile(file: Express.Multer.File, userId: number) {
    if (!userId) {
      throw new UnauthorizedException('User ID is missing');
    }

    try {
      const fileUrl = await this.azureService.uploadFile(file);
      const mimeType = file.mimetype;
      const extractedText = await this.extractText(fileUrl, mimeType);

      // Get explanation of the extracted text using the LLM
      const explanation = await this.getExplanationFromLLM(extractedText);

      // Save the document and explanation in the database
      const document = await this.prisma.document.create({
        data: {
          userId,
          filePath: fileUrl,
          extractedText,
          explanation,
        },
      });

      return {
        message: 'File uploaded successfully!',
        document: {
          id: document.id,
          filePath: document.filePath,
          extractedText: document.extractedText,
          explanation: document.explanation,
        },
      };
    } catch (error) {
      console.error('Error processing file:', error.message);
      throw new Error('Failed to process file');
    }
  }

  async listDocuments(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
      select: {
        id: true,
        filePath: true,
        extractedText: true,
        explanation: true,
        createdAt: true,
      },
    });
  }

  async listDocumentNames(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
      select: {
        id: true,
        filePath: true,
      },
    });
  }

  async getDocumentForDownload(documentId: number, userId: number) {
    const document = await this.prisma.document.findFirst({
      where: {
        id: Number(documentId),
        userId: userId,
      },
      select: {
        id: true,
        filePath: true,
        extractedText: true,
        explanation: true,
      },
    });

    if (!document) {
      throw new Error('Document not found or access denied');
    }

    return document;
  }

  async getDocumentsByUser(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
    });
  }

  async deleteDocument(id: number) {
    return this.prisma.document.delete({
      where: { id },
    });
  }
}
