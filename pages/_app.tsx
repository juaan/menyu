import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { Tracking } from 'nextwarm';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import id from '@locale/id.json';

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
});

const extendedTheme = extendTheme({
  breakpoints,
  fonts: {
    body: 'Nunito',
    heading: 'Nunito',
  },
});

i18n.use(initReactI18next).init({
  resources: {
    id: {
      translation: {
        ...id,
      },
    },
  },
  lng: 'id',
  fallbackLng: 'id',

  interpolation: {
    escapeValue: false,
  },
});

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      Tracking.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ChakraProvider theme={extendedTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
