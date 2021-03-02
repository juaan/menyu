import { Grid, Stack, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Layout from '@components/Layout';
import PageHeader from '@components/PageHeader';
import Barcode from '@components/Barcode';
import BackgroundOverlay from '@components/BackgroundOverlay';
import FoodSvg from '@assets/food.svg';

const UploadPage = () => {
  const { t } = useTranslation();

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
        <Stack spacing={8}>
          <PageHeader
            title={t('pages.share.title')}
            subtilte={t('pages.share.desc')}
          />
          <Barcode value="https://cf.shopee.co.id/file/2d289f4b621956614de21b183618d23e" />
        </Stack>
        <Box
          gridArea="ilustration"
          visibility={{ sm: 'hidden', md: 'initial' }}
        >
          <FoodSvg />
        </Box>
      </Grid>
      <BackgroundOverlay>
        <FoodSvg />
      </BackgroundOverlay>
    </Layout>
  );
};

export default UploadPage;
