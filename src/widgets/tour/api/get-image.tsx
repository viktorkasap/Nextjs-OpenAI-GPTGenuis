import axios, { AxiosError } from 'axios';

const sourceUrl = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=`;

export const getImageUrl = async (query: string) => {
  try {
    const res = await axios(`${sourceUrl}${query}`);

    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Get Image Error:', (error as AxiosError).message);

    return null;
  }
};
