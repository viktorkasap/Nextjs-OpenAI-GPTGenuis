import { SignUp as SignUpClerk } from '@clerk/nextjs';
export const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <SignUpClerk />
    </div>
  );
};
