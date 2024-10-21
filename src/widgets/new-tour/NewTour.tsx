'use client';

import { FormEvent } from 'react';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getExistingTour, generateTour as generateTourRequest, createTour as createTourRequest } from './api';
import { Destination, Tour } from './types';
import { Info } from './ui';

export const NewTour = () => {
  const checkExistingTour = useCheckExistingTour();
  const generateTour = useGenerateTour();
  const createTour = useCreateTour();

  const isPending = checkExistingTour.isPending || generateTour.isPending || createTour.isPending;
  const isError = checkExistingTour.isError || generateTour.isError || createTour.isError;
  const error = checkExistingTour.error || generateTour.error || createTour.error;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData) as unknown as Destination;
    generateTour.mutate(destination);
    e.currentTarget.reset();
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
          <input type="text" name="state" placeholder="Oregon" disabled={isPending} className="input input-bordered join-item w-full" />
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

      <Info tour={generateTour.data} />
    </>
  );
};

// Use check existing tour
const useCheckExistingTour = () => {
  return useMutation<Tour | null, Error, Destination>({
    mutationFn: (destination) => getExistingTour(destination),
    onSuccess: (tour) => {
      // eslint-disable-next-line no-console
      console.log('existing', tour);
    },
    onError: () => {
      toast.error(<div className="">No matching city found...</div>);
    },
  });
};

// Use generate tour
const useGenerateTour = () => {
  return useMutation<Tour | null, Error, Destination>({
    mutationFn: (destination) => generateTourRequest(destination),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('Generated', data);
    },
    onError: () => {
      toast.error(<div className="">No matching city found...</div>);
    },
    retry: 0,
  });
};

// Use create tour
const useCreateTour = () => {
  return useMutation<Tour | null, Error, Destination>({
    mutationFn: (destination) => createTourRequest(destination),
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('created', data);
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
