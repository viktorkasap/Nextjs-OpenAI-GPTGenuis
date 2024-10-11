import { db } from '@/shared/db';

const prismaCreateTaskHandler = async ({ title, content }: { title: string; content: string }) => {
  await db.task.create({
    data: { title, content },
  });

  const allTasks = await db.task.findMany({
    orderBy: {
      completed: 'asc',
    },
  });

  return allTasks;
};

const prismaGetAllTasks = async () => {
  const allTasks = await db.task.findMany({
    orderBy: {
      completed: 'asc',
    },
  });

  return allTasks;
};

const Prisma = async () => {
  await prismaCreateTaskHandler({ title: String(Date.now()), content: `content ${String(Date.now())}` });
  const tasks = await prismaGetAllTasks();

  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Prisma</h1>
      <hr />
      <div>
        {tasks.map((task) => (
          <p key={task.id}>
            {task.title}::{new Date(task.createdAt).toDateString()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Prisma;
