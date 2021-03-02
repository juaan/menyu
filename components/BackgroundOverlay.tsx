import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

const BackgroundOverlay: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      w="100vw"
      zIndex="-1"
      ratio={1}
      opacity={0.3}
      display={{ md: 'none' }}
    >
      {children}
    </Box>
  );
};

export default BackgroundOverlay;
