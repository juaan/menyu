import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Container,
  Flex,
  Heading,
  Switch,
  useColorMode,
  Box,
  Progress,
} from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  hideBottom?: boolean;
}

const Layout: React.FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [navigating, setNavigating] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setNavigating(true);
    });
    router.events.on('routeChangeComplete', () => {
      setNavigating(false);
    });
    router.events.on('routeChangeError', () => {
      setNavigating(false);
    });
  }, []);

  return (
    <>
      <Box as="header" w="100%" position="fixed" zIndex="99">
        <Progress
          size="sm"
          colorScheme="teal"
          value={100}
          isIndeterminate={navigating}
        />
        <Container maxW="5xl" height="4rem">
          <Flex
            flex={1}
            alignItems="center"
            justifyContent="space-between"
            h="100%"
          >
            <Link href="/">
              <a>
                <Heading size="md">{t('global.brandName')}</Heading>
              </a>
            </Link>
            <Switch
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
              colorScheme="teal"
              size="md"
            />
          </Flex>
        </Container>
      </Box>
      <Container as="main" maxW="5xl" h="100%" pt={{ sm: '6rem', md: '8rem' }}>
        {props.children}
      </Container>
    </>
  );
};

export default Layout;
