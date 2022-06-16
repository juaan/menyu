import { Grid, Stack, Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import type { GetServerSideProps, NextPage } from 'next';

import Layout from '@components/Layout';
import PageHeader from '@components/PageHeader';
import Barcode from '@components/Barcode';
import BackgroundOverlay from '@components/BackgroundOverlay';
import FoodSvg from '@assets/food.svg';
import { isClient } from '@utils/platform';

type Props = { host: string | null };

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => ({ props: { host: context.req.headers.host || null } });

const UploadPage: NextPage<Props> = ({ host }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { path, name } = router.query;

  const handleShare = () => {
    // TODO: will be implemented soon
    if (isClient) {
      navigator
        // @ts-ignore only invoked if the method exist
        .share({
          title: `Menu ${name}`,
          text: `Menu ${name}`,
          url: ``,
        });
    }
  };
  return (
    <Layout>
      <Grid
        templateColumns={{ md: '1fr 1.5fr' }}
        templateRows={{ lg: 'initial' }}
        templateAreas={{
          sm: '"description"',
          md: '"description ilustration"',
        }}
      >
        <Stack spacing={4} w={'100%'}>
          <PageHeader
            title={t('pages.share.title')}
            subtilte={t('pages.share.desc')}
          />
          <Stack spacing={2} w={'100%'}>
            <Barcode value={`${host}/menyu?path=${path}`} />
          </Stack>
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
