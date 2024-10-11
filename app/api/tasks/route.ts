/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/shared/db';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async (request: NextRequest) => {
  const tasks = await db.task.findMany({ orderBy: { createdAt: 'desc' } });

  return Response.json({ tasks });
};

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  const task = await db.task.create({
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return NextResponse.json({ task });
};

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();
  await db.task.delete({ where: { id: data.taskId } });

  return NextResponse.json({ status: 1 });
};
