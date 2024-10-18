'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { generateChatResponse } from '@/widgets/chat/api';

interface Message {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
}

export const Chat = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  /* Auto scrolling to the last message */
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const { mutate, isPending, isError, error, reset } = useMutation<Message, Error, Message>({
    mutationFn: (message) => generateChatResponse([...messages, message]),
    onSuccess: (answer) => {
      setMessages((prevMessages) => [...prevMessages, answer]);
    },
    onError: () => {
      toast.error(<div className="">Something went wrong</div>);
    },
  });

  /* Submitting */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = { role: 'user', content: prompt } as Message;

    setMessages((prevMessages) => [...prevMessages, message]);
    mutate(message);
    setPrompt('');
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      {/* Messages */}
      <div ref={messagesRef} style={{ overflowY: 'auto' }} className="max-h-[calc(100vh-12rem)] pr-2 scroll">
        {messages.map(({ content, role }, index) => (
          <MessageBox key={index} role={role} content={content} />
        ))}
      </div>

      {/* If it is error */}
      {isError && <ErrorBox error={error?.message} reset={reset} />}

      {/* Is pending */}
      <div className="mt-4 h-8">{isPending ? <span className="loading loading-dots loading-xs"></span> : ''}</div>

      {/* Form box */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="join w-full">
          <input
            required
            autoFocus
            type="text"
            value={prompt}
            disabled={isPending}
            placeholder="Type a message..."
            className="input input-bordered join-item w-full"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button type="submit" className="btn btn-primary join-item w-1/6" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

interface MessageBoxProps {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
}
const MessageBox = ({ role, content }: MessageBoxProps) => {
  const isUser = role === 'user';
  const avatar = isUser ? 'You' : 'Alien Jake 👽';
  const bgColor = isUser ? 'bg-base-300' : null;

  return (
    <div className={`mb-4 p-4 rounded-lg ${bgColor}`}>
      <p>
        <strong className="capitalize">{avatar}</strong>
        <br />
        <i>{content}</i>
      </p>
    </div>
  );
};

interface ErrorBoxProps {
  error: string;
  reset: () => void;
}
const ErrorBox = ({ reset, error }: ErrorBoxProps) => {
  return (
    <div role="alert" className="alert alert-error mt-8">
      <button onClick={reset}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <span>{error}</span>
    </div>
  );
};
