import { QueryClient } from '@tanstack/react-query';

import { getAllTours } from './api';
import { ToursList, TourCard } from './ui';

export const Tours = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });

  return <ToursList TourCard={TourCard} />;
};
