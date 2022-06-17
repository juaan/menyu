import { useRouter } from 'next/router';
import { generateFileURL } from '@utils/telegramClient';

const MenyuPage = () => {
  const router = useRouter();
  const { path } = router.query;
  const fileUrl = generateFileURL(path);
  return (
    <>
      <iframe
        src={`http://docs.google.com/gview?url=${fileUrl}&embedded=true`}
        style={{ width: '100%', height: '100vh' }}
        frameBorder="0"
        title="menyu"
      />
    </>
  );
};

export default MenyuPage;
