import { SignUp as SignUpClerk } from '@clerk/nextjs';
export const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <SignUpClerk />
    </div>
  );
};
