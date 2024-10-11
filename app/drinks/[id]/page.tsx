import Image from 'next/image';
import Link from 'next/link';

import { Drink as IDrink } from '../types';

const fetchDrink = async (id: string): Promise<{ drinks: IDrink[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  try {
    const response = await fetch(`${url}${id}`);

    if (!response.ok) {
      throw Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw Error(`Something went wrong: ${(error as Error).message}`);
  }
};

type DrinkProps = {
  params: {
    id: string;
  };
};

const Drink = async ({ params }: DrinkProps) => {
  const drink = await fetchDrink(params.id);

  const title = drink?.drinks[0]?.strDrink || 'No title';
  const imgSrc = drink?.drinks[0]?.strDrinkThumb || 'No image';

  return (
    <div>
      <Link href="/drinks" className="btn btn-primary mt-8 mb-12">
        Back to Drinks
      </Link>
      <h1 className="text-5xl mb-8 font-bold">{params.id}</h1>
      <h2 className="text-4xl mb-8">{title}</h2>
      <Image priority width={300} alt={title} height={300} src={imgSrc} className="w-48 h-48 rounded-lg shadow-lg mb-4 object-cover" />
    </div>
  );
};

export default Drink;
