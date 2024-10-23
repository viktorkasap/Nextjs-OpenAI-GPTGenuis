'use server';

import { db } from '@/shared/db';

import { Tour } from '../types';

export const getSingleTour = async ({ id }: { id: string }): Promise<Tour | null> => {
  const result = await db.tour.findUnique({
    where: { id },
  });

  // eslint-disable-next-line no-console
  console.log('Result by ID', result);

  return result;
};
