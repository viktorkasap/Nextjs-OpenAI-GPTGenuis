import Link from 'next/link';

import { Drink } from './types';

const fetchData = async (): Promise<{ drinks: Drink[] }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw Error(`Something went wrong: ${(error as Error).message}`);
  }
};

const Drinks = async () => {
  const data = await fetchData();
  // console.log(data);

  return (
    <div>
      <h1 className="text-5xl mb-8 font-bold">Drinks</h1>

      <hr />

      <DrinkList drinks={data.drinks} />
    </div>
  );
};

export default Drinks;

const DrinkList = ({ drinks }: { drinks: Drink[] }) => {
  return (
    <ul className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {drinks.map((drink) => (
        <li key={drink.idDrink}>
          <Link href={`/drinks/${drink.idDrink}`} className="btn btn-outline text-xl font-medium">
            {drink.strDrink}
          </Link>
        </li>
      ))}
    </ul>
  );
};
