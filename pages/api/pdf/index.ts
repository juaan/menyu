import type { NextApiRequest, NextApiResponse } from 'next';
import { generateFileURL } from '@utils/telegramClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { path } = req.query;
  const fileUrl = generateFileURL(path);
  const file = await fetch(fileUrl);
  res.send(file.body);
};
