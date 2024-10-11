'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error }: ErrorProps) => {
  // eslint-disable-next-line no-console
  console.log(error);

  return <div>{error.message}</div>;
};

export default Error;
