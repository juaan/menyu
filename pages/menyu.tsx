import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '@components/Layout';
import { Container } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';

const PDFLoader = dynamic(() => import('@components/PDFLoader'), {
  ssr: false,
});

type Props = { isMobile: boolean };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const UA = context.req.headers['user-agent'];
  const isMobile = Boolean(
    (UA || '').match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      isMobile,
    },
  };
};

const MenyuPage: NextPage<Props> = ({ isMobile }) => {
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
        const file = new File([result], `Menyu ${name}`, {
          type: 'application/pdf',
        });
        setFile(file);
      };

      generateFile();
    }
  }, [path]);

  if (file == null) {
    return (
      <Layout>
        <Container w={'100%'} display={'flex'} justifyContent={'center'}>
          <p>Loading...</p>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container w={'100%'} display={'flex'} justifyContent={'center'}>
        <PDFLoader source={file} isMobile={isMobile} />
      </Container>
    </Layout>
  );
};

export default MenyuPage;
