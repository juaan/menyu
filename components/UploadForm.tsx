/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Select,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSubmit: (params: {
    name: string;
    category: string;
    files: FileList;
  }) => void;
  isLoading?: boolean;
}

const FormUpload: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'custom' | string>('');
  const [isCustom, setCustom] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (category === 'custom') {
      setCustom(true);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit({
      name,
      category,
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
          <FormLabel htmlFor="category">
            {t('components.uploadForm.category.label')}
          </FormLabel>
          {isCustom ? (
            <Input
              id="category"
              placeholder={t('components.uploadForm.category.placeholder')}
              isRequired
              onChange={(e) => setCategory(e.currentTarget.value)}
            />
          ) : (
            <Select
              id="category"
              placeholder={t('components.uploadForm.category.default')}
              value={category}
              isRequired
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="custom">{t('common.other')}</option>
            </Select>
          )}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{t('components.uploadForm.file.label')}</FormLabel>
          <Input
            onChange={(e) => setFiles(e.currentTarget.files)}
            isRequired
            type="file"
            accept="image/*,.pdf"
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
