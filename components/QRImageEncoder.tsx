import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode';
import { Image, AspectRatio, useToast } from '@chakra-ui/react';

interface Props {
  value: string;
}

export const QRImageEncoder: React.FC<Props> = ({ value }) => {
  const toast = useToast();
  const { t } = useTranslation();
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
    <AspectRatio ratio={1}>
      <Image src={source} />
    </AspectRatio>
  );
};
