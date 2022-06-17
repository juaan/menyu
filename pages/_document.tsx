import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Tracking } from 'nextwarm';
import Footer from '@components/Footer';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <title>Menyu - Pembungkus Menyu Makanan</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&display=swap"
            rel="stylesheet"
          />
          <Tracking.GAScript trackingID={GA_TRACKING_ID ?? ''} />
        </Head>
        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
          <Footer />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
