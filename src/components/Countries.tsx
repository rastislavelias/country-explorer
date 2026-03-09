import type { Country } from "../App";
import CountryCard from "./CountryCard";

export default function Countries({
  filteredCountries,
}: {
  filteredCountries: Country[];
}) {
  return (
    <>
      <h2 className="results-count">
        <span className="count">{filteredCountries.length}</span> countries
        found
      </h2>
      <ul className="country-grid">
        {filteredCountries.map(
          (country) => (
            <CountryCard key={country.name} {...country} />
          ),
        )}
      </ul>
    </>
  );
}
