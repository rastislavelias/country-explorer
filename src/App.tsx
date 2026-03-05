import { useEffect, useState } from 'react'
import './App.css'

type ApiCountry = {
  name: {
    common: string
  }
  population: number
  region: string
  capital?: string[]
  flags: {
    svg: string
    alt: string
  }
}

type Country = {
  name: string
  population: number
  region: string
  capital: string
  flag: {
    svg: string
    alt: string
  }
}

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags')

        if (!response.ok) {
          throw new Error('Failed to fetch countries')
        }

        const data: ApiCountry[] = await response.json()

        console.log('Fetched countries data:', data)

        const mapped: Country[] = data.map((country) => ({
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital?.[0] ?? 'N/A',
          flag: {
            svg: country.flags.svg,
            alt: country.flags.alt
          }
        }))

        setCountries(mapped)
      } catch (err) {
        console.error('Error fetching countries:', err)
        setError('Failed to load countries data')
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  return (
    <>
      <div className='app-container'>
        <header>
          <div className='logo-container'>
            <div className='logo'>
              <svg xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ width: '100%'}} fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM143.31,41.34,152,56.9,125.09,81.24,112.85,88H96.14a16,16,0,0,0-13.88,8l-8.73,15.23L63.38,84.19,74.32,58.32a87.87,87.87,0,0,1,69-17ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Zm102.58,86.78,1.13-5.81a16.09,16.09,0,0,0-4-13.9,1.85,1.85,0,0,1-.14-.14L120,174.74,133.7,144l22.82,3.08,45.72,28.12A88.18,88.18,0,0,1,142.58,214.78Z"></path></svg>
            </div>
          </div>
          <div className='header-content'>
            <h1>Country Explorer</h1>
            <p>Browse and filter countries</p>
          </div>
        </header>
        <main>
          <form className='search-bar'>
            <div className='input-group'>
              <label htmlFor='query' className='sr-only'>
                Country
              </label>
              <input type="text" name='query' id='query' placeholder='Enter country name...' />
            </div>
            <div className='input-group'>
              <label htmlFor='region' className='sr-only'>
                Region filter
              </label>
              <select name='region' id='region'>
                <option value=''>Filter by region</option>
                <option value='africa'>Africa</option>
                <option value='americas'>Americas</option>
                <option value='asia'>Asia</option>
                <option value='europe'>Europe</option>
                <option value='oceania'>Oceania</option>
              </select>
            </div>
          </form>
          {loading && <p>Loading countries...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && (
            <>
              <h2 className='results-count'>
                <span className='count'>{countries.length}</span>{' '}
                countries found
              </h2>
              <ul className='country-grid'>
                {countries.map(({ name, population, region, capital, flag }) => (
                  <li key={name} className='country-card'>
                    <div className='country-header'>
                      <div className='flag'>
                        <img src={flag.svg} alt={flag.alt} />
                      </div>
                      <h3>{name}</h3>
                    </div>
                    <dl className='country-info'>
                      <dt>Population</dt>
                      <dd className='population'>{population}</dd>
                      <dt>Region</dt>
                      <dd>{region}</dd>
                      <dt>Capital</dt>
                      <dd>{capital}</dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
      <footer>
        <p>
          Country Explorer is a React + TypeScript project focused on data fetching,
          filtering, and component structure. Source code on{" "}
          <a href="https://rastislavelias.github.io/country-explorer/" target="_blank">
            GitHub <NewTabIcon />
          </a>. Created by{" "}
          <a href="https://rastislavelias.com" target="_blank">
            Rastislav Elias <NewTabIcon />
          </a>.
        </p>
      </footer>
    </>
  )
}

export default App

function NewTabIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
      <path d="M224,104a8,8,0,0,1-16,0V59.32l-66.33,66.34a8,8,0,0,1-11.32-11.32L196.68,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z"></path>
    </svg>
  )
}
