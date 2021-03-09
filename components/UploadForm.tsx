/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef, RefAttributes } from 'react';
import { Box } from '@chakra-ui/react';

import { FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSubmit: (params: { name: string; files: FileList }) => void;
  isLoading?: boolean;
}

const FormUpload: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLDivElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const [name, setName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit({
      name,
      files: files!,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">
            {t('components.uploadForm.name.label')}
          </FormLabel>
          <Input
            value={name}
            isRequired
            id="name"
            placeholder={t('components.uploadForm.name.placeholder')}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <Input
            onChange={(e) => setFiles(e.currentTarget.files)}
            isRequired
            type="file"
            accept="image/*,.pdf"
            ref={inputRef}
            style={{ display: 'none' }}
          />
          <FormLabel>{t('components.uploadForm.file.label')}</FormLabel>
          <Input
            onClick={() => inputRef?.current?.click()}
            value={
              files?.item(0)?.name ||
              t('components.uploadForm.file.placeholder').toString()
            }
            readOnly
          />
        </FormControl>
        <Box textAlign="right">
          <Button type="submit" colorScheme="teal" isLoading={props.isLoading}>
            {t('common.upload')}
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default FormUpload;
