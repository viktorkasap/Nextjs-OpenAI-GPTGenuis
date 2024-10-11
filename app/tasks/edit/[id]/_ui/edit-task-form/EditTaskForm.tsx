import { updateTask, Task } from '@/entities/tasks';

import { SubmitButton } from './_ui';

export const EditTaskForm = ({ task }: { task: Task }) => {
  return (
    <form className="mt-8 mb-16" action={updateTask}>
      <input type="hidden" value={task.id} name="taskId" />
      <div className="flex flex-col  gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="task-completed" className="label">
            <p>Completed: </p>
          </label>
          <input
            type="checkbox"
            name="completed"
            id="task-completed"
            defaultChecked={task.completed}
            className="checkbox checkbox-primary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="task-input-title" className="label">
            <p>Title: *</p>
          </label>
          <input
            required
            type="text"
            name="title"
            id="task-input-title"
            defaultValue={task.title}
            placeholder="Type the title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="task-input-content" className="label">
            <p>Content: *</p>
          </label>
          <textarea
            required
            name="content"
            id="task-input-content"
            defaultValue={task.content}
            placeholder="Type the content"
            className="textarea input-bordered w-full"
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};
