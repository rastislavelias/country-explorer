import type { Country } from "../App";

export default function CountryCard({
  name,
  population,
  region,
  capital,
  flag,
}: Country) {
  return (
    <li key={name} className="country-card">
      <div className="country-header">
        <div className="flag">
          <img src={flag.svg} alt={flag.alt} loading="lazy" />
        </div>
        <h3>{name}</h3>
      </div>
      <dl className="country-info">
        <dt>Population</dt>
        <dd className="population">{formatPopulation(population)}</dd>
        <dt>Region</dt>
        <dd>{region}</dd>
        <dt>Capital</dt>
        <dd>{capital}</dd>
      </dl>
    </li>
  );
}

const formatPopulation = (population: number) => {
  return population.toLocaleString();
};
