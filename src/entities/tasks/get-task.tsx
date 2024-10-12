'use server';

import { db } from '@/shared/db';

export const getTask = async (id: string) => {
  return db.task.findUnique({ where: { id } });
};
