import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Layout from '@components/Layout';
import PageHeader from '@components/PageHeader';
import UploadForm from '@components/UploadForm';
import BackgroundOverlay from '@components/BackgroundOverlay';
import DinnerSvg from '@assets/dinner.svg';
import { supabase } from '@utils/supabaseClient';
import { makePostDocRequest, getDocPath } from '@utils/telegramClient';

const UploadPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendDocumentMessage = async (file: File) => {
    const data = new FormData();
    data.append('document', file);
    const response = await makePostDocRequest(data);
    return response;
  };

  const getFilePath = async (fileID: string) => {
    const res = await getDocPath(fileID);
    return res.result.file_path;
  };

  const handleSubmit = async (params: { name: string; files: FileList }) => {
    setLoading(true);
    try {
      const response = await sendDocumentMessage(params.files[0]);
      const filePath = await getFilePath(response.result.document.file_id);

      await insertRestoData({
        name: params.name,
        fileLink: filePath,
      });
      router.push({
        pathname: '/share',
        query: {
          path: filePath,
          name: params.name,
        },
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
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
