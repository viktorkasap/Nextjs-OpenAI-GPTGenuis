'use client';

import { useFormStatus } from 'react-dom';
export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-neutral" disabled={pending}>
      {pending && <span className="loading loading-xs" />}
      Add task
    </button>
  );
};
