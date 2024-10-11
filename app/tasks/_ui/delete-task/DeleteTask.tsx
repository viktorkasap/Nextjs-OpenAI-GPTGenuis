import { deleteTask } from '@/entities/tasks';

import { DeleteButton } from './_ui';

export const DeleteTask = ({ taskId }: { taskId: string }) => {
  return (
    <form action={deleteTask}>
      <input type="hidden" name="taskId" value={taskId} />
      <DeleteButton />
    </form>
  );
};
