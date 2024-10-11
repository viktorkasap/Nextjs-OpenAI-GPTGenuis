'use client';

import { useFormStatus } from 'react-dom';

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-error btn-xs text-white">
      {pending && <span className="loading loading-xs" />}
      Delete
    </button>
  );
};
