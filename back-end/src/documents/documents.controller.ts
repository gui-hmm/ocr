import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  UnauthorizedException,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AzureService } from 'src/services/azure.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

interface Request {
  user?: {
    userId: number;
    email?: string;
  };
}

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly azureService: AzureService,
  ) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      const userId = req.user['userId'];
      if (!userId) {
        throw new UnauthorizedException('User not authenticated');
      }

      const response = await this.documentsService.uploadFile(file, userId);

      return response;
    } catch (error) {
      return { message: 'Error uploading file', error: error.message };
    }
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async listDocuments(@Req() req: Request) {
    if (!req.user || !req.user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userId = req.user['userId']; // Extrai o ID do usuário do token JWT
    return this.documentsService.listDocuments(userId);
  }

  // Retorna apenas os nomes dos documentos do usuário autenticado
  @Get('list-names')
  async listDocumentNames(@Req() req: Request) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.documentsService.listDocumentNames(userId);
  }

  // Download do documento com texto extraído e interações LLM
  @Get('download/:id')
  async downloadDocument(
    @Param('id') documentId: string,
    @Req() req: Request,
    @Res() res: any,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const document = await this.documentsService.getDocumentForDownload(
      Number(documentId),
      userId,
    );

    if (!document) {
      throw new NotFoundException('Document not found or access denied');
    }

    const fileName = `document_${documentId}_with_text.txt`;
    const fileContent = `
      Documento: ${document.filePath}

      Texto extraído:
      ${document.extractedText}

      Interação LLM:
      ${document.explanation}
      `;

    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    return res.send(fileContent);
  }

  @Get('user/:userId')
  async getDocumentsByUser(@Param('userId') userId: string) {
    return this.documentsService.getDocumentsByUser(Number(userId));
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentsService.deleteDocument(Number(id));
  }
}
