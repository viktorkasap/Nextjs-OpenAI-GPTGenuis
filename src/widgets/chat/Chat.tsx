'use client';

import { FormEvent, useState } from 'react';

import { generateChatResponse } from '@/widgets/chat/api';

export const Chat = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<{ id: number; content: string | null; role: string; asked: string }[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (prompt) {
      const response = await generateChatResponse(prompt);
      const { content, role } = response.message;

      setMessages([...messages, { id: response.index, content, role, asked: prompt }]);
      setPrompt('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">Messages</h2>
      </div>
      <div>
        {messages.map(({ id, content, role, asked }, index) => (
          <div key={id + index} className="py-4">
            <p className="pb-2">
              <strong>You:</strong>
              <br />
              <i>{asked}</i>
            </p>
            <p>
              <strong className="capitalize">{role}:</strong>
              <br />
              <i>{content}</i>
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            required
            type="text"
            value={prompt}
            placeholder="Type a message..."
            className="input input-bordered join-item w-full"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="btn btn-primary join-item">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
