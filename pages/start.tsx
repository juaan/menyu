import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Layout from '@components/Layout';
import PageHeader from '@components/PageHeader';
import UploadForm from '@components/UploadForm';
import BackgroundOverlay from '@components/BackgroundOverlay';
import DinnerSvg from '@assets/dinner.svg';
import { supabase } from '@utils/supabaseClient';

const UploadPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | undefined>();

  const handleSubmit = async (params: { name: string; files: FileList }) => {
    setLoading(true);

    // TODO: upload to telegram

    await insertRestoData({
      name: params.name,
      fileLink: 'https://anthonyju.one',
    });

    // TODO: generate QR Code
    setLoading(false);
    // TODO: navigate to result page
  };

  const insertRestoData = async (params: {
    name: string;
    fileLink: string;
  }) => {
    const { error } = await supabase.from('restaurants').insert({
      name: params.name,
      menu_link: params.fileLink,
    });

    if (error) {
      console.log('error ->', error);
    }
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
