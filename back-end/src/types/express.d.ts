declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number; // Ou o tipo correto do ID do usuário
        email?: string;
      };
    }
  }
}

declare module 'express' {
  export interface Request {
    user?: { id: number; email?: string };
    file?: Multer.File;
    files?: Multer.File[];
  }
}

declare namespace Multer {
  export interface File {
    /** Nome do campo no formulário */
    fieldname: string;
    /** Nome original do arquivo enviado */
    originalname: string;
    /** Nome gerado pelo sistema de armazenamento */
    filename: string;
    /** Localização temporária do arquivo */
    path: string;
    /** Tipo MIME do arquivo */
    mimetype: string;
    /** Tamanho do arquivo em bytes */
    size: number;
    /** Buffer contendo os dados do arquivo (se aplicável) */
    buffer?: Buffer;
  }
}
