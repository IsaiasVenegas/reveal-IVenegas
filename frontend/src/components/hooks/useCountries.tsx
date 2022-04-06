import { useEffect, useState } from "react";
import { Country, setCountry } from "../types";
import { getCountries } from "./actions";

/**
 * Manage countries loading
 * Display a button for each country loaded
 * Manage App state
 * @param activeCountry Clicked country
 * @param setActiveCountry Setter
 * @returns
 */
export const useCountries = (
  activeCountry: Country,
  setActiveCountry: setCountry
) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  // Load a list of countries
  useEffect(() => {
    const fetchData = async () => {
      const json = await getCountries();
      return json;
    };
    fetchData().then(setCountries);
  }, []);

  return (
    <div>
      {countries && (
        <div>
          <button
            type="button"
            key={0}
            title={`Show all cities`}
            className={activeCountry.name === "all" ? "primary" : "secondary"}
            onClick={() => setActiveCountry({ name: "all", count: 500 })}
            aria-labelledby="all cities button"
          >
            All cities
          </button>
          {countries.map((country, index) => (
            <button
              type="button"
              key={index + 1}
              title={`Filter cities of ${country.name}`}
              className={
                activeCountry.name === country.name ? "primary" : "secondary"
              }
              onClick={() =>
                setActiveCountry({
                  name: country.name,
                  count: country.count,
                })
              }
              aria-labelledby={`${country.name} button`}
            >
              {country.name} ({country.count})
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
