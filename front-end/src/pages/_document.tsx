// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'; // Importar apenas de _document.tsx
import { ServerStyleSheet } from 'styled-components';
import { DocumentInitialProps } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()} {/* Injetar os estilos do Styled-components */}
          </>
        ),
      };
    } finally {
      sheet.seal(); // Finaliza a coleta de estilos
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
