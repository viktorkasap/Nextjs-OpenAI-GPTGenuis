'use client';

import { FormEvent, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { generateChatResponse } from '@/widgets/chat/api';

interface Message {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
}

export const Chat = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutate } = useMutation<Message, Error, Message>({
    mutationFn: (message) => generateChatResponse([...messages, message]),
    onSuccess: (answer) => {
      setMessages((prevMessages) => [...prevMessages, answer]);
    },
    onError: (error) => {
      toast.error(`Error::: ${error.message}`);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = { role: 'user', content: prompt } as Message;

    setMessages((prevMessages) => [...prevMessages, message]);
    mutate(message);
    setPrompt('');
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">Messages</h2>
      </div>
      <div>
        {messages.map(({ content, role }, index) => (
          <div key={index} className="py-4">
            <p>
              <strong className="capitalize">{role === 'user' ? 'You' : role}:</strong>
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
