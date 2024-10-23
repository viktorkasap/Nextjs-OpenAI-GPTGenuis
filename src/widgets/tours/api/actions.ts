'use server';

import { db } from '@/shared/db';

import { Tour } from '../types';

// Existing

interface GetAllTours {
  searchValue?: string;
}

export const getAllTours = async ({ searchValue }: GetAllTours = {}): Promise<Tour[] | []> => {
  if (!searchValue) {
    const result = await db.tour.findMany({ orderBy: { city: 'asc' } });

    // eslint-disable-next-line no-console
    console.log('Result1', result);

    return result;
  }

  const searchResult = await db.tour.findMany({
    orderBy: { city: 'asc' },
    where: {
      OR: [{ country: { contains: searchValue, mode: 'insensitive' } }, { city: { contains: searchValue, mode: 'insensitive' } }],
    },
  });

  // eslint-disable-next-line no-console
  console.log('Result2', searchResult);

  return searchResult;
};
