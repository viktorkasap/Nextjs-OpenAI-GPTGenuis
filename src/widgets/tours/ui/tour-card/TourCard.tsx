'use client';

import Link from 'next/link';
import { CiMapPin } from 'react-icons/ci';

import { Tour } from '../../types';

export const TourCard = ({ id, country, city, flag, title }: Tour) => {
  // eslint-disable-next-line no-console
  console.log('TOUR', country);

  return (
    <Link href={`/tours/${id}`}>
      <div className="card card-compact rounded-xl bg-base-100">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-current">
            <CiMapPin />
            {city}
          </h2>
          <h3 className="card-title text-lg">
            {country} {flag}
          </h3>
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};
