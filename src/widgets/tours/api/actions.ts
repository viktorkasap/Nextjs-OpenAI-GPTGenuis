'use server';

import { db } from '@/shared/db';

import { Tour } from '../types';

// Existing

interface GetAllTours {
  country?: string;
  city?: string;
}
export const getAllTours = async ({ country, city }: GetAllTours = {}): Promise<Tour[] | []> => {
  if (!country && !city) {
    const result = await db.tour.findMany({ orderBy: { city: 'asc' } });

    // eslint-disable-next-line no-console
    console.log('Result1', result);

    return result;
  }

  const searchResult = await db.tour.findMany({
    orderBy: { city: 'asc' },
    where: {
      OR: [{ country: { contains: country } }, { city: { contains: city } }],
    },
  });

  // eslint-disable-next-line no-console
  console.log('Result2', searchResult);

  return searchResult;
};
