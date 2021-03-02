import dynamic from 'next/dynamic';
import { useToast } from '@chakra-ui/react';
import url from 'url';

import Layout from '@components/Layout';
const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

const UploadPage = () => {
  const toast = useToast();
  const handleScan = (value: string | null) => {
    if (value) {
      const parsedUrl = url.parse(value);
      if (parsedUrl.protocol) {
        window.location.href = parsedUrl.href;
      } else {
        toast({
          title: 'QR',
          description: value,
          status: 'success',
          duration: 200,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Layout hideBottom>
      <QrReader
        delay={200}
        style={{ width: '100%' }}
        onScan={handleScan}
        onError={console.warn}
      />
    </Layout>
  );
};

export default UploadPage;
