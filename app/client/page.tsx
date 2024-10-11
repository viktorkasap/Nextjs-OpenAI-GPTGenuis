'use client';

import { useState } from 'react';

const Client = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Client</h1>

      <hr />

      <div className="text-2xl p-4">{count}</div>

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={() => setCount((currentCount) => (currentCount += 1))}>
          Increase
        </button>
        <button className="btn btn-warning" onClick={() => setCount((currentCount) => (currentCount -= 1))}>
          Decrease
        </button>
      </div>
    </div>
  );
};

export default Client;
