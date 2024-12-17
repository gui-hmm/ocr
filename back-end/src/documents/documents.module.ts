import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { PrismaService } from '../services/prisma.service';
import { AzureService } from 'src/services/azure.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { HuggingFaceService } from 'src/services/huggingface.service';

@Module({
  imports: [AuthModule],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    PrismaService,
    AzureService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    HuggingFaceService,
  ],
})
export class DocumentsModule {}
