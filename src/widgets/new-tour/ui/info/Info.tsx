import { GeneratedTour, Tour } from '../../types';

interface InfoProps {
  tour: Tour | GeneratedTour;
}

export const Info = ({ tour }: InfoProps) => {
  const { city, country, currencySymbol, currency, flag, title, stops, description } = tour;

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-semibold mb-4">{title}</h1>

      <div className="card bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">
            {city}, {country} {flag}
          </h2>

          <p className="text-sm">
            Currency: {currency} | {currencySymbol}
          </p>

          <div className="divider divider-accent">Description</div>

          <p className="leading-loose mb-6">{description}</p>

          <div className="divider divider-accent">Stops</div>
          <ul>
            {stops.map((stop, index) => (
              <li key={index} className="mb-4 bg-base-200 p-4 rounded-xl">
                <p>• {stop}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
