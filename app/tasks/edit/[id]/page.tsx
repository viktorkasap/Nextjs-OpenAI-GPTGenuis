import { EditTaskForm } from '@/app/tasks/edit/[id]/_ui';
import { getTask } from '@/entities/tasks';

interface TaskProps {
  params: {
    id: string;
  };
}

const Task = async ({ params }: TaskProps) => {
  const task = await getTask(params.id);

  if (!task) {
    return <p>There is no any task</p>;
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-5xl mb-2 font-bold">Task</h1>
      <p className="mb-2 text-sm">
        Crated at: <span className="italic">{new Date(task.createdAt).toDateString()}</span>
      </p>
      <hr />
      <EditTaskForm task={task} />
    </div>
  );
};

export default Task;
