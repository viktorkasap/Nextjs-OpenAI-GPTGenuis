import { UserButton, currentUser, auth } from '@clerk/nextjs';

export const UserMenu = async () => {
  const user = await currentUser();
  const { userId } = auth();

  return (
    <div className="px-2 flex items-center gap-4">
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col">
        <p className="text-sm">{user?.emailAddresses[0].emailAddress}</p>
        <p className="text-xs">{userId}</p>
      </div>
    </div>
  );
};
