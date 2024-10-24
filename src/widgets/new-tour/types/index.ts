export interface Tour {
  id: string;
  title: string;
  description: string;
  state: string | null;
  country: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  city: string;
  stops: string[];
  poster: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GeneratedTour {
  title: string;
  description: string;
  state: string;
  country: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  city: string;
  stops: string[];
}

export interface NewTour {
  title: string;
  description: string;
  state: string | null;
  poster: string | null;
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
