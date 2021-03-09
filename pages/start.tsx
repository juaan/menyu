import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Layout from '@components/Layout';
import PageHeader from '@components/PageHeader';
import UploadForm from '@components/UploadForm';
import BackgroundOverlay from '@components/BackgroundOverlay';
import DinnerSvg from '@assets/dinner.svg';

const UploadPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | undefined>();

  const handleSubmit = (params: { name: string; files: FileList }) => {
    console.log(params);
    setLoading(true);
    // timeoutId.current = setTimeout(() => {
    //   setLoading(false);
    //   router.push('/share');
    // }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);

  return (
    <Layout>
      <Grid
        templateColumns={{ md: '1fr 1.5fr' }}
        templateRows={{ sm: '1fr', lg: 'initial' }}
        templateAreas={{
          sm: '"description"',
          md: '"description ilustration"',
        }}
        alignItems="center"
      >
        <Stack spacing={6}>
          <PageHeader
            title={t('pages.start.title')}
            subtilte={t('pages.start.desc')}
          />
          <UploadForm onSubmit={handleSubmit} isLoading={loading} />
        </Stack>
        <Box
          gridArea="ilustration"
          visibility={{ sm: 'hidden', md: 'initial' }}
        >
          <DinnerSvg />
        </Box>
      </Grid>
      <BackgroundOverlay>
        <DinnerSvg />
      </BackgroundOverlay>
    </Layout>
  );
};

export default UploadPage;
