'use server';

import { redirect } from 'next/navigation';

import { db } from '@/shared/db';

export const updateTask = async (formData: FormData) => {
  // Fake delay in 1 sec
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Action
  const taskId = formData.get('taskId');
  const title = formData.get('title');
  const content = formData.get('content');
  const completed = formData.get('completed');

  if (typeof taskId === 'string' && typeof title === 'string' && typeof content === 'string') {
    await db.task.update({
      where: { id: taskId },
      data: { title: title.trim(), content: content.trim(), completed: Boolean(completed) },
    });

    redirect('/tasks');
  }
};
