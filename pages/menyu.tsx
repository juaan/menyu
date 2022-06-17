import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';

const PDFLoader = dynamic(() => import('@components/PDFLoader'), {
  ssr: false,
});

const MenyuPage = () => {
  const router = useRouter();
  const { path, name } = router.query;
  const [file, setFile] = useState<File | null>(null);

  const getFile = async (path: string | string[]) => {
    const response = await fetch(`/api/pdf?path=${path}`);
    return response.blob();
  };

  useEffect(() => {
    if (path) {
      const generateFile = async () => {
        const result = await getFile(path);
        console.log('wkwk ->', result);
        const file = new File([result], `Menyu ${name}`, {
          type: 'application/pdf',
        });
        setFile(file);
      };

      generateFile();
    }
  }, [path]);

  console.log('wkwk', file);

  if (file == null) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <PDFLoader source={file} />
    </Layout>
  );
};

export default MenyuPage;
