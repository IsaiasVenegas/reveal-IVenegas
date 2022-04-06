import { useEffect, useState } from "react";
import { City } from "../types";

export const useCities = (
  country: string,
  lowerLimit: number,
  step: number
) => {
  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    if (country !== "") {
      let api = "http://localhost:3001/api/cities";
      let pagination = `?from=${lowerLimit * step}&limit=${step}`;
      let filter = country === "all" ? "" : `&country=${country}`;
      fetch(`${api}${pagination}${filter}`)
        .then((response) => response.json())
        .then(setCities);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [country, lowerLimit, step]);

  return (
    <tbody>
      {cities?.map((city, index) => (
        <tr key={index}>
          <td>{city.name}</td>
          <td>{city.country}</td>
          <td>{city.subcountry}</td>
          <td>
            <a
              href={`https://www.geonames.org/${city.geonameid}/`}
              target="_blank"
              rel="noreferrer"
            >
              See it on Geonames website
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
