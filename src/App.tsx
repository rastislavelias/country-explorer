import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Loading from "./components/Loading";
import ErrorMessage from "./components/Error";
import Countries from "./components/Countries";
import Footer from "./components/Footer";

type ApiCountry = {
  name: {
    common: string;
  };
  cca2: string;
  population: number;
  region: string;
  capital?: string[];
  flags: {
    alt: string;
  };
};

export type Country = {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: {
    svg: string;
    alt: string;
  };
};

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,population,region,capital,flags",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data: ApiCountry[] = await response.json();

        const mapped: Country[] = data.map((country) => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0] ?? "N/A",
          flag: {
            svg: `https://flagcdn.com/${country.cca2.toLowerCase()}.svg`,
            alt: country.flags.alt,
          },
        }));

        setCountries(mapped);
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries data");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) => {
      return (
        country.name.toLowerCase().startsWith(query.toLowerCase()) &&
        country.region.toLowerCase().includes(region.toLowerCase())
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="app-container">
        <Header />
        <main>
          <Search query={query} setQuery={setQuery} region={region} setRegion={setRegion} />
          <Loading loading={loading} />
          <ErrorMessage error={error} />
          {!loading && !error && (
            <Countries filteredCountries={filteredCountries} />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
