import Link from 'next/link';

export const Home = () => {
  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Home page</h1>
      <Link href="/client" className="btn btn-accent">
        Get started
      </Link>
    </div>
  );
};
