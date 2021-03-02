import React from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';

interface Props {
  title: string;
  subtilte: string;
}

const PageHeader: React.FC<Props> = (props) => {
  return (
    <Box maxW="20rem">
      <Heading as="h3" size="xl" fontWeight="normal">
        {props.title}
      </Heading>
      <Text mt={2}>{props.subtilte}</Text>
    </Box>
  );
};

export default PageHeader;
