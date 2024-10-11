import { CreateTaskForm, TaskList } from './_ui';

const Tasks = () => {
  return (
    <div className="max-w-lg">
      <h1 className="text-5xl mb-8 font-bold">Tasks</h1>
      <hr />

      <CreateTaskForm />

      <TaskList />
    </div>
  );
};

export default Tasks;
