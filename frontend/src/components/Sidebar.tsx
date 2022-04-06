import "./Sidebar.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Country = {
  name: string;
  count: number;
};

interface IProps {
  activeCountry: Country;
  setActiveCountry: Dispatch<SetStateAction<Country>>;
}

export const Sidebar = (props: IProps) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/countries")
      .then((response) => response.json())
      .then(setCountries);
  }, []);

  return (
    <div id="sidebar">
      <h2>Cities App</h2>
      <div>
        {countries && (
          <button
            key={0}
            title={`Show all cities`}
            className={
              props.activeCountry.name === "all" ? "primary" : "secondary"
            }
            onClick={() => props.setActiveCountry({ name: "all", count: 500 })}
          >
            All cities
          </button>
        )}
        {countries?.map((country, index) => (
          <button
            key={index + 1}
            title={`Filter cities of ${country.name}`}
            className={
              props.activeCountry.name === country.name
                ? "primary"
                : "secondary"
            }
            onClick={() =>
              props.setActiveCountry({
                name: country.name,
                count: country.count,
              })
            }
          >
            {country.name} ({country.count})
          </button>
        ))}
      </div>
    </div>
  );
};
