import React from 'react';
import { Image, AspectRatio } from '@chakra-ui/react';

interface Props {
  source: string;
}

export const QRImageEncoder: React.FC<Props> = ({ source }) => {
  return (
    <AspectRatio ratio={1} minW={250}>
      <Image src={source} />
    </AspectRatio>
  );
};
