import { useEffect, useState } from "react";
import { Country, setCountry } from "../types";

export const useCountries = (
  activeCountry: Country,
  setActiveCountry: setCountry
) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/countries")
      .then((response) => response.json())
      .then(setCountries);
  }, []);

  return (
    <div>
      {countries && (
        <div>
          <button
            key={0}
            title={`Show all cities`}
            className={activeCountry.name === "all" ? "primary" : "secondary"}
            onClick={() => setActiveCountry({ name: "all", count: 500 })}
          >
            All cities
          </button>
          {countries.map((country, index) => (
            <button
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
            >
              {country.name} ({country.count})
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
