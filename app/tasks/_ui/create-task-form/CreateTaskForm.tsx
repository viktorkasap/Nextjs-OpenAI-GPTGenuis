'use client';

import { useEffect, useRef } from 'react';

import { useFormState } from 'react-dom';
import { toast } from 'react-hot-toast';

import { createTask, State } from '@/entities/tasks';

import { SubmitButton } from './_ui';

export const CreateTaskForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, formAction] = useFormState<State, FormData>(createTask, { message: '', error: '' });

  useEffect(() => {
    if (formState.error) {
      toast.error(formState.error);
    }

    if (formState.message) {
      toast.success(formState.message);
    }

    if (formRef.current) {
      formRef.current.reset();
    }
  }, [formState]);

  return (
    <form ref={formRef} className="mt-8 mb-16" action={formAction}>
      {formState?.message && <p className="md-2">OK: {formState.message}</p>}
      {formState?.error && <p className="md-2">Error: {formState.error}</p>}

      <div className="flex flex-col  gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label htmlFor="task-input-title" className="label">
            <p>Title: *</p>
          </label>
          <input
            required
            type="text"
            name="title"
            id="task-input-title"
            placeholder="Type the title"
            className="input input-bordered w-full"
          />
        </div>
        {/* Content */}
        <div className="flex flex-col gap-2">
          <label htmlFor="task-input-content" className="label">
            <p>Content: *</p>
          </label>
          <textarea
            required
            name="content"
            id="task-input-content"
            placeholder="Type the content"
            className="textarea input-bordered w-full"
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};
