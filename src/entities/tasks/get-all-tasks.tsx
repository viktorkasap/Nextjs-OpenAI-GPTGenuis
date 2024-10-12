'use server';

import { db } from '@/shared/db';

export const getAllTasks = async () => {
  return db.task.findMany({ orderBy: { createdAt: 'desc' } });
};
