import Link from 'next/link';

import { DeleteTask } from '@/app/tasks/_ui';
import { getAllTasks } from '@/entities/tasks';

export const TaskList = async () => {
  const tasks = await getAllTasks();

  if (!tasks.length) {
    return <h3 className="mt-8 font-medium text-lg">There is no any task so far.</h3>;
  }

  return (
    <ul className="mt-8">
      {tasks.map((task) => (
        <li key={task.id}>
          <div className="flex items-center justify-between px-6 py-4 mb-4 border rounded-lg shadow bg-white">
            <div className={`text-lg capitalize ${task.completed ? 'line-through' : null}`}>{task.title}</div>
            <div className="flex gap-6 items-center">
              <Link href={`/tasks/edit/${task.id}`} className="btn btn-warning btn-xs">
                Edit
              </Link>
              <DeleteTask taskId={task.id} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
