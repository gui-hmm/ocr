import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class HuggingFaceService {
  private readonly apiUrl =
    'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf';
  private readonly apiKey = process.env.HUGGING_FACE_API_KEY;

  async explainFileContent(filePath: string): Promise<string> {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo não encontrado: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
      if (!fileContent) {
        throw new Error('O arquivo está vazio.');
      }

      const prompt = `Explique o conteúdo do texto abaixo de maneira clara e simples:\n\n${fileContent}`;

      const response = await axios.post(
        this.apiUrl,
        {
          inputs: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const generatedText =
        response.data?.[0]?.generated_text || 'Erro ao obter explicação';
      return generatedText;
    } catch (error) {
      console.error(
        'Erro ao processar o arquivo ou interagir com a LLM:',
        error.response?.data || error,
      );
      throw new Error('Erro ao processar o texto do arquivo.');
    }
  }
}
