'use server';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import { db } from '@/shared/db';

export type State = { message: string; error: string };

const Task = z.object({
  title: z.string().trim().min(3),
  content: z.string().trim().min(3),
});

export const createTask = async (state: State, payload: FormData): Promise<State> => {
  // Fake delay in 1 sec
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    // Check Zod
    const { title, content } = Task.parse({ title: payload.get('title'), content: payload.get('content') });

    await db.task.create({ data: { title: title.trim(), content: content.trim() } });
    revalidatePath('/tasks');

    return { message: 'Success!', error: '' };
  } catch (error) {
    let errorMessage = 'Database error occurred';

    // Regular Error
    if (error instanceof Error) {
      errorMessage = (error as Error).message;
    }

    // Zod Error
    if (error instanceof z.ZodError) {
      errorMessage = error.issues.map((err) => err.message).join(', ');
    }

    return { message: '', error: errorMessage };
  }

  return state;
};
