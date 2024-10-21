import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { NewTour } from '@/widgets/new-tour';

export const NewTourPage = () => {
  return (
    <HydrationBoundary state={dehydrate(new QueryClient())}>
      <NewTour />
    </HydrationBoundary>
  );
};
