import { dehydrate, HydrationBoundary, QueryClient, useQueryClient } from '@tanstack/react-query';

import { Tours } from '@/widgets/tours';

export const ToursPage = () => {
  return (
    <HydrationBoundary state={dehydrate(new QueryClient())}>
      <h1 className="text-5xl mb-8 font-bold">Tours page</h1>
      <Tours />
    </HydrationBoundary>
  );
};
