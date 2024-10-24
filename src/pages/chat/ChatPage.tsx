import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Chat } from '@/widgets/chat';

export const ChatPage = () => {
  return (
    <HydrationBoundary state={dehydrate(new QueryClient())}>
      <Chat />
    </HydrationBoundary>
  );
};
