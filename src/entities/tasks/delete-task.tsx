'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/shared/db';

export const deleteTask = async (formData: FormData) => {
  // Fake delay in 1 sec
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const taskId = formData.get('taskId');

  if (typeof taskId === 'string') {
    await db.task.delete({ where: { id: taskId } });
    revalidatePath('/tasks');
  }
};
