export default function Search({
  query,
  setQuery,
  region,
  setRegion,
}: {
  query: string;
  setQuery: (query: string) => void;
  region: string;
  setRegion: (region: string) => void;
}) {
  return (
    <form className="search-bar">
      <div className="input-group">
        <label htmlFor="query" className="sr-only">
          Country
        </label>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="Enter country name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="region" className="sr-only">
          Region filter
        </label>
        <select
          name="region"
          id="region"
          aria-label="Region filter"
          autoComplete="off"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Filter by region</option>
          <option value="africa">Africa</option>
          <option value="americas">Americas</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </form>
  );
}
