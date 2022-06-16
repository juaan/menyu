import { useRouter } from 'next/router';

import { generateFileURL } from '@utils/telegramClient';

const MenyuPage = () => {
  const router = useRouter();
  const { path } = router.query;

  return (
    <iframe src={generateFileURL(path)} title="title">
      <a href="generateFileURL(path)">Download PDF</a>
    </iframe>
  );
};

export default MenyuPage;
