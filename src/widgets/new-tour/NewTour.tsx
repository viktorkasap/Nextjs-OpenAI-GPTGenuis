'use client';

import { FormEvent, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getExistingTour, generateTour as generateTourRequest, createTour as createTourRequest } from './api';
import { Destination, Tour as ITour, NewTour as INewTour, GeneratedTour as IGeneratedTour } from './types';
import { Info } from './ui';

export const NewTour = () => {
  const queryClient = useQueryClient();
  const checkExistingTour = useCheckExistingTour();
  const generateTour = useGenerateTour();
  const createTour = useCreateTour();

  const isPending = checkExistingTour.isPending || generateTour.isPending || createTour.isPending;
  const isError = checkExistingTour.isError || generateTour.isError || createTour.isError;
  const error = checkExistingTour.error || generateTour.error || createTour.error;

  const [tour, setTour] = useState<ITour | IGeneratedTour | null>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 1) Reset default settings
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;

    // 2) Get values
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData) as unknown as Destination;

    // 3) Check existing tour
    const existingTour = await getExistingTour(destination);

    if (existingTour) {
      setTour(existingTour);
    } else {
      // 4) Generate new tour
      generateTour.mutateAsync(destination).then((generatedTour) => {
        if (generatedTour) {
          // 5) Create new tour from AI response
          createTour.mutateAsync({ ...generatedTour, poster: '' }).then((createdTour) => {
            setTour(createdTour);
            queryClient.invalidateQueries({ queryKey: ['tours'] });
          });
        }
      });
    }

    formElement.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your destination</h2>

        {/* Form */}
        <div className="join w-full">
          <input
            required
            type="text"
            name="country"
            disabled={isPending}
            placeholder="Unites States *"
            className="input input-bordered join-item w-full"
          />
          <input type="text" name="state" placeholder="Arizona" disabled={isPending} className="input input-bordered join-item w-full" />
          <input
            required
            type="text"
            name="city"
            placeholder="Phoenix *"
            disabled={isPending}
            className="input input-bordered join-item w-full"
          />
          <button className="btn btn-primary join-item  w-1/6" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>

      {/* If it is loading */}
      {isPending && <span className="loading loading-spinner loading-xs mt-4 mb-4"></span>}

      {/* If it is error */}
      {isError && error && <ErrorBox error={error?.message} reset={generateTour.reset} />}

      <div className="mt-16"></div>

      {tour && <Info tour={tour} />}
    </>
  );
};

// Use check existing tour
const useCheckExistingTour = () => {
  return useMutation<ITour | null, Error, Destination>({
    mutationFn: (destination) => getExistingTour(destination),
    onSuccess: (tour) => {
      // eslint-disable-next-line no-console
      console.log('Existing tour:', tour);
    },
    onError: () => {
      toast.error(<div className="">No matching city found...</div>);
    },
  });
};

// Use generate tour
const useGenerateTour = () => {
  return useMutation<IGeneratedTour | null, Error, Destination>({
    mutationFn: (destination) => generateTourRequest(destination),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('Generated tour:', data);
    },
    onError: () => {
      toast.error(<div className="">No matching city found...</div>);
    },
    retry: 0,
  });
};

// Use create tour
const useCreateTour = () => {
  return useMutation<ITour | null, Error, INewTour>({
    mutationFn: (newTour) => createTourRequest({ ...newTour }),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('Created tour:', data);
    },
    onError: () => {
      toast.error(<div className="">Something went wrong...</div>);
    },
  });
};

// Error
interface ErrorBoxProps {
  error: string;
  reset: () => void;
}

const ErrorBox = ({ reset, error }: ErrorBoxProps) => {
  return (
    <div role="alert" className="alert alert-error my-8 max-w-2xl">
      <button onClick={reset}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <span>{error}</span>
    </div>
  );
};
