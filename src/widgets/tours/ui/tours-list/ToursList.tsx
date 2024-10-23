'use client';

import { ComponentType, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDebounceValue } from 'usehooks-ts';

import { getAllTours } from '../../api';
import { Tour } from '../../types';

interface ToursListProps {
  TourCard: ComponentType<Tour>;
}

export const ToursList = ({ TourCard }: ToursListProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useDebounceValue<string>(searchValue, 400);

  useEffect(() => {
    setDebouncedValue(searchValue);
  }, [searchValue, setDebouncedValue]);

  const { data, isPending } = useQuery({
    queryKey: ['tours', debouncedValue],
    queryFn: () => getAllTours({ searchValue: debouncedValue }),
  });

  return (
    <div>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            required
            type="text"
            value={searchValue}
            disabled={isPending}
            placeholder="Type counry or city"
            className="input input-bordered join-item w-full"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="button" disabled={isPending} onClick={() => setSearchValue('')}>
            {isPending ? 'Wait...' : 'Reset'}
          </button>
        </div>
      </form>

      {/* Is pending */}
      {isPending && <span className="loading">Loading...2</span>}

      {/* Not found message */}
      {!data?.length && !isPending && (
        <div role="alert" className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
            <path
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No tours found</span>
          <div>
            <button className="btn btn-sm btn-primary" onClick={() => setSearchValue('')}>
              Reset search
            </button>
          </div>
        </div>
      )}

      {Boolean(data?.length) && (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((tour) => (
            <li key={tour.id}>
              <TourCard {...tour} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
