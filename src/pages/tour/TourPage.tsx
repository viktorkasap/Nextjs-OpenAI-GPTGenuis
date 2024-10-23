import { Tour } from '@/widgets/tour';

interface TourPageProps {
  params: {
    id: string;
  };
}

export const TourPage = ({ params }: TourPageProps) => {
  return (
    // <HydrationBoundary state={dehydrate(new QueryClient())}>
    <Tour params={params} />
    // </HydrationBoundary>
  );
};
