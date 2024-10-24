'use client';

import { FormEvent, Suspense, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getExistingTour, generateTour as generateTourRequest, createTour as createTourRequest } from './api';
import { Destination, Tour as ITour, NewTour as INewTour, GeneratedTour as IGeneratedTour } from './types';
import { Info } from './ui';

export const NewTour = () => {
  const [noTourMessage, setNoTourMessage] = useState<string>('');
  const [tour, setTour] = useState<ITour | IGeneratedTour | null>();

  const queryClient = useQueryClient();
  const checkExistingTour = useCheckExistingTour();
  const generateTour = useGenerateTour();
  const createTour = useCreateTour();

  const isPending = checkExistingTour.isPending || generateTour.isPending || createTour.isPending;
  const isError = checkExistingTour.isError || generateTour.isError || createTour.isError;
  const error = checkExistingTour.error || generateTour.error || createTour.error;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // 1) Reset default settings
    e.preventDefault();
    setTour(null);
    setNoTourMessage('');

    const resetForm = () => {
      (e.target as HTMLFormElement).reset();
    };

    // 2) Get values
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData) as unknown as Destination;

    // 3) Check existing tour
    const existingTour = await getExistingTour(destination);

    if (existingTour) {
      setTour(existingTour);
      resetForm(); // FIXME: 1 Double
    } else {
      // 4) Generate new tour from AI
      generateTour.mutateAsync(destination).then((generatedTour) => {
        if (generatedTour) {
          // 5) Create new tour from AI response
          createTour.mutateAsync({ ...generatedTour, poster: '' }).then((createdTour) => {
            resetForm(); // FIXME: 2 Double
            setTour(createdTour);
            queryClient.invalidateQueries({ queryKey: ['tours'] });
          });
        } else {
          // 6) Reporting a non-existent tour
          setNoTourMessage(`Possibly a typo in the name of the country "${destination.country}" or the city "${destination.city}".`);
        }
      });
    }
  };

  return (
    <Suspense>
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

      {/* 1) If it is loading */}
      {isPending && <span className="loading loading-spinner loading-xs mt-4 mb-4"></span>}

      {/* 2) If it is error */}
      {isError && error && <ErrorBox error={error?.message} reset={generateTour.reset} />}

      {/* 3) If tour hadn't been found */}
      {Boolean(noTourMessage) && (
        <div role="alert" className="max-w-2xl alert alert-warning mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{noTourMessage}</span>
        </div>
      )}

      <div className="mt-16"></div>

      {/* 4) Tour information */}
      {tour && <Info tour={tour} />}
    </Suspense>
  );
};

// Check existing tour
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

// Generate tour
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

// Create tour
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
