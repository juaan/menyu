import Link from 'next/link';
import { Button, Stack, Box, Heading, Text, Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import Layout from '@components/Layout';
import OrderingSvg from '@assets/ordering.svg';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Grid
        templateColumns={{ md: '1fr 2fr' }}
        templateRows={{ sm: '1fr 1fr', lg: 'initial' }}
        templateAreas={{
          sm: '"ilustration"\n"description"',
          md: '"description ilustration"',
        }}
        textAlign={{ sm: 'center', md: 'left' }}
        alignItems="center"
      >
        <Stack
          spacing={4}
          gridArea="description"
          p={{ sm: '0 2rem', md: 'initial' }}
        >
          <Heading as="h1" size="2xl">
            {t('global.brandName')}
          </Heading>
          <Text>{t('pages.home.desc')}</Text>
          <Link href="/start">
            <a>
              <Button colorScheme="teal">
                {t('pages.home.actions.start')}
              </Button>
            </a>
          </Link>
        </Stack>
        <Box gridArea="ilustration">
          <OrderingSvg />
        </Box>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
