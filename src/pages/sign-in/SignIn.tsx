import { SignIn as SignInClerk } from '@clerk/nextjs';
export const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <SignInClerk />
    </div>
  );
};
