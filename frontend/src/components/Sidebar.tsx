import "./Sidebar.css";
import { useEffect, useState } from "react";

type Country = {
  name: string;
  count?: number;
};

export const Sidebar = () => {
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
        {countries?.map((country, index) => (
          <button key={index} title={`Filter cities of ${country.name}`}>
            {country.name} ({country.count})
          </button>
        ))}
      </div>
    </div>
  );
};
