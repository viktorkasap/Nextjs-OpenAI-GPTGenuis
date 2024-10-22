'use client';

import Link from 'next/link';

import { Tour } from '../../types';

export const TourCard = ({ id, country, city, flag, currencySymbol, title, description }: Tour) => {
  console.log('TOUR', country);

  return (
    <Link href={`{/tours/${id}`}>
      <div className="card card-compact rounded-xl bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-current">{city}</h2>
          <h3 className="card-title text-lg">
            {country} {flag}
          </h3>
        </div>
      </div>
    </Link>
  );
};
