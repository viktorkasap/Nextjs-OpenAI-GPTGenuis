'use server';

import OpenAI from 'openai';

import { Destination, Tour } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getGenerateQueryMessage = ({ country, state, city }: Destination) => {
  return `Find a ${city} in this ${state} and ${country}. 
  If ${city} in this ${country} exist, create a list of things families can do in this ${city}, ${country}.
  Once you have a list, create a one-day tour. Response should be in the following JSON format:
  {
    "country": "${country}",
    "currency": "${country} currency",
    "currencySymbol": "${country} currency symbol",
    "state": "Which ${state} is it",
    "flag": "emoji ${country} flag",
    "city": "${city}",
    "title" "title of the tour",
    "description": "description of the city and tour",
    "stops": ["short paragraph on the stop 1", "short paragraph on the stop 2", "short paragraph on the stop 3"]
  }
  If you can't find info on exact ${city}, or ${city} does not exist, ot it's population is less than 1, 
  or it is not located in the following ${country}, return "null", with no additional characters.`;
};

const baseConfig = {
  temperature: 0,
  model: 'gpt-3.5-turbo',
};

// Existing
export const getExistingTour = async ({ country, state, city }: Destination) => {
  const completion = await openai.chat.completions.create({
    ...baseConfig,
    messages: [
      { role: 'system', content: 'You are a tour guide.' },
      { role: 'user', content: getGenerateQueryMessage({ country, state, city }) },
    ],
  });

  const { content } = completion.choices[0].message;

  return content ? (JSON.parse(content) as Tour) : null;
};

// Generate
export const generateTour = async ({ country, state, city }: Destination) => {
  const completion = await openai.chat.completions.create({
    ...baseConfig,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: getGenerateQueryMessage({ country, state, city }) },
    ],
  });

  const { content } = completion.choices[0].message;

  return content ? (JSON.parse(content) as Tour) : null;
};

// Create
export const createTour = async ({ country, state, city }: Destination) => {
  const completion = await openai.chat.completions.create({
    ...baseConfig,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: getGenerateQueryMessage({ country, state, city }) },
    ],
  });

  const { content } = completion.choices[0].message;

  return content ? (JSON.parse(content) as Tour) : null;
};
