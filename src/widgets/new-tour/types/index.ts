export interface Tour {
  title: string;
  description: string;
  country: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  city: string;
  stops: string[];
}

export interface Message {
  role: 'function' | 'system' | 'user' | 'assistant';
  content: string;
}

export interface Destination {
  country: string;
  state: string;
  city: string;
}
