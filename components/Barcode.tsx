import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Button } from '@chakra-ui/react';

import { QRImageEncoder } from '@components/QRImageEncoder';

interface Props {
  value: string;
}
const Barcode: React.FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack spacing={2}>
        <QRImageEncoder value={value} />
      </Stack>

      <Stack
        spacing={2}
        direction={{ sm: 'row', md: 'row-reverse' }}
        justify="flex-end"
      >
        <Button colorScheme="teal">{t('common.share')}</Button>
        <Button colorScheme="teal">{t('common.save')}</Button>
      </Stack>
    </>
  );
};

export default Barcode;
