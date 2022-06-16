const token = process.env.NEXT_PUBLIC_BOT_TOKEN || '';
const chatID = process.env.NEXT_PUBLIC_TELE_CHAT_ID || '';
const baseUrl = 'https://api.telegram.org';
const botToken = `bot${token}`;

const makePostDocRequest = (body: FormData | null) => {
  body?.append('chat_id', chatID);

  return fetch(`${baseUrl}/${botToken}/sendDocument`, {
    method: 'POST',
    body: body,
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

const getDocPath = (fileID: string) => {
  return fetch(`${baseUrl}/${botToken}/getFile?file_id=${fileID}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
    });
};

const generateFileURL = (filePath: string | string[]) => {
  return `${baseUrl}/file/${botToken}/${filePath}`;
};

export { makePostDocRequest, getDocPath, generateFileURL };
