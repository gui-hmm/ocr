# Upload de Documentos com OCR e LLM

## Descrição do Projeto
Este projeto permite que os usuários façam upload de documentos através de uma interface web, realizem extração de texto (OCR) e obtenham explicações contextuais interativas sobre os dados extraídos, utilizando um modelo de linguagem avançado (LLM).

## Funcionalidades
- **Autenticação de Usuários:** Somente usuários autenticados podem realizar uploads.
- **Upload de Documentos:** Suporte a arquivos PDF, imagens e documentos do Word.
- **Extração de Texto (OCR):** Processamento automático para capturar o texto contido no documento.
- **Explicação Interativa (LLM):** Fornece contexto e explicações baseadas no texto extraído.
- **Visualização de Documentos Enviados:** Lista de documentos enviados com detalhes.
- **Download de Documentos:** Permite baixar os documentos enviados com texto e interações anexados.
- **Mensagens de Feedback:** Indicadores visuais e mensagens para uploads bem-sucedidos ou erros.

---

## Tecnologias Utilizadas
### Frontend
- **React** com **Next.js**
- **TypeScript**
- **Styled-components**

### Backend
- **NestJS**: Framework utilizado para construção do backend.
- **Prisma ORM**: Utilizado para modelar e interagir com o banco de dados.
- **Tesseract.js**: Biblioteca usada para extração de texto de imagens.
- **pdf-parse**: Biblioteca para extração de texto de arquivos PDF.
- **Mammoth.js**: Biblioteca para extração de texto de documentos Word (.docx).
- **Hugging Face LLM (Llama 2-7b-chat-hf)**: Utilizado para fornecer explicações interativas e contexto sobre os dados extraídos.
- **Azure Blob Storage**: Serviço utilizado para armazenamento e hospedagem dos arquivos enviados.

### Banco de Dados
- PostgreSQL

### Hospedagem
- **Frontend:** Vercel
- **Backend:** Render

---

## Estrutura do Projeto
### Frontend
```bash
src/
  app/
    components/
    services/
    style/
  pages/
```

### Backend
```bash
src/
  auth/
  documents/
  services/
  types/
```

---

## Requisitos para Execução Local
1. **Node.js** (>= 18.x)
2. **PostgreSQL** (instância configurada)
3. **Gerenciador de Pacotes**: npm ou yarn
4. Variáveis de ambiente configuradas:

### Variáveis de Ambiente - Frontend
- `NEXT_PUBLIC_API_URL`: URL do backend

### Variáveis de Ambiente - Backend
- `DATABASE_URL`: URL de conexão do PostgreSQL
- `NEXT_PUBLIC_FRONTEND_URL`: URL do frontend (para CORS)
- `HUGGING_FACE_API_KEY`: Chave para a API Hugging Face
- `AZURE_STORAGE_ACCOUNT_NAME`: Nome da conta de armazenamento no Azure, usado para acessar o Blob Storage onde os arquivos enviados são armazenados.
- `AZURE_STORAGE_ACCOUNT_KEY`: Chave de acesso da conta de armazenamento no Azure, usada para autenticar operações no Blob Storage.
- `AZURE_STORAGE_CONTAINER_NAME`: Nome do contêiner no Blob Storage do Azure onde os arquivos enviados são armazenados.
- `JWT_SECRET`: Chave secreta usada para assinatura e validação de tokens JWT, garantindo a segurança na autenticação do usuário.

Certifique-se de preencher essas variáveis com os valores corretos para o ambiente de produção ou desenvolvimento.

---

## Como Executar Localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/gui-hmm/ocr.git
cd ocr
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` no backend e no frontend com as variáveis mencionadas acima.

### 3. Instalar Dependências
#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 4. Executar o Banco de Dados
Certifique-se de que o PostgreSQL está em execução e a variável `DATABASE_URL` está configurada corretamente.

### 5. Rodar as Migrações do Banco
```bash
cd back-end
npx prisma migrate dev
```

### 6. Iniciar os Servidores
#### Backend
```bash
cd back-end
npm run start:dev
```

#### Frontend
```bash
cd front-end
npm run dev
```

---

## Como Utilizar
1. Acesse o frontend no navegador (por padrão, `http://localhost:3000`).
2. Faça login ou registre-se.
3. Faça upload de um documento.
4. Aguarde a extração do texto e a explicação interativa.
5. Baixe o documento processado, se necessário.

---

## Deploy
### Frontend
1. Configure as variáveis de ambiente no Vercel.
2. Faça o deploy conectando o repositório.

### Backend
1. Configure as variáveis de ambiente no Render.
2. Faça o deploy conectando o repositório.

---

## Contribuições
Sinta-se à vontade para enviar pull requests ou relatar problemas no repositório oficial.

---

## Contato
- Autor: Guilherme Henrique de Melo Moura
- Email: henriquemelomoura@gmail.com
- LinkedIn: [Guilherme Henrique](https://linkedin.com/in/guilherme-henrique-mm)

---

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
