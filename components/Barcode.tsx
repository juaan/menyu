import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import { Stack, Button, useToast } from '@chakra-ui/react';

import { QRImageEncoder } from '@components/QRImageEncoder';

interface Props {
  value: string;
}
const Barcode: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  const toast = useToast();
  const [source, setSource] = useState('');

  useEffect(() => {
    QRCode.toDataURL(value, function (err, url) {
      if (err) {
        toast({
          title: t('common.errorTitle'),
          description: t('errors.qrEncoding'),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setSource(url);
      }
    });
  }, [value]);

  return (
    <>
      <Stack
        display="flex"
        justify={'center'}
        alignItems={'center'}
        minW={250}
        minH={250}
      >
        <QRImageEncoder source={source} />
      </Stack>

      <Stack
        direction={{ sm: 'row', md: 'row-reverse' }}
        justify={{ sm: 'flex-end', md: 'center' }}
      >
        {/* <Button colorScheme="teal">{t('common.share')}</Button> */}
        <a href={source} download>
          <Button colorScheme="teal">{t('common.save')}</Button>
        </a>
      </Stack>
    </>
  );
};

export default Barcode;
