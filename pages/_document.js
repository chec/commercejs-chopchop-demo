import Document, { Html, Head, Main, NextScript } from "next/document";
import GoogleFonts from "next-google-fonts";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" />
          <GoogleFonts href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap" />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
