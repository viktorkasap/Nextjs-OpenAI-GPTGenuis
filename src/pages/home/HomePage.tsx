import Link from 'next/link';

export const HomePage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-primary">GPTGenius</h1>
          <p className="py-6 text-lg leading-loose">GPTGenius: Your AI language companion language companion. Powered by OpenAI.</p>
          <Link className="btn btn-secondary" href="/chat">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};
