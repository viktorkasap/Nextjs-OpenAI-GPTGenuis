'use client';

import { ComponentType } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getAllTours } from '../../api';
import { Tour } from '../../types';

interface ToursListProps {
  TourCard: ComponentType<Tour>;
}

export const ToursList = ({ TourCard }: ToursListProps) => {
  const { data, isPending } = useQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });

  if (!data?.length) {
    return <p>No tours found</p>;
  }

  if (isPending) {
    return <span className="loading">Loading...2</span>;
  }

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {data?.map((tour) => (
        <li key={tour.id}>
          <TourCard {...tour} />
        </li>
      ))}
    </ul>
  );
};
