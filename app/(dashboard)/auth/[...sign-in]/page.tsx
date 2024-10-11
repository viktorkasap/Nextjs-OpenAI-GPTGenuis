const SignIn = ({ params }: Record<string, string[]>) => {
  // eslint-disable-next-line no-console
  console.log('PARAMS', params);

  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Sign-In</h1>
    </div>
  );
};

export default SignIn;
