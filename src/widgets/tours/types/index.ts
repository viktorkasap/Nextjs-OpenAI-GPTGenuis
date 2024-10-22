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
