import "./Sidebar.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Country = {
  name: string;
  count?: number;
};

interface IProps {
  activeCountry: string;
  setActiveCountry: Dispatch<SetStateAction<string>>;
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
            className={props.activeCountry === "all" ? "primary" : "secondary"}
            onClick={() => props.setActiveCountry("all")}
          >
            All cities
          </button>
        )}
        {countries?.map((country, index) => (
          <button
            key={index + 1}
            title={`Filter cities of ${country.name}`}
            className={
              props.activeCountry === country.name ? "primary" : "secondary"
            }
            onClick={() => props.setActiveCountry(country.name)}
          >
            {country.name} ({country.count})
          </button>
        ))}
      </div>
    </div>
  );
};
