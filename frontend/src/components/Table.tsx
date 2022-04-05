import "./Table.css";
import { useEffect, useState } from "react";

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

interface IProps {
  activeCountry: string;
}

export const Table = (props: IProps) => {
  const [cities, setCities] = useState<City[] | null>(null);

  useEffect(() => {
    if (props.activeCountry !== "") {
      let api = "http://localhost:3001/api/cities";
      let pagination = "?from=0&limit=500";
      let country =
        props.activeCountry === "all" ? "" : `&country=${props.activeCountry}`;
      fetch(`${api}${pagination}${country}`)
        .then((response) => response.json())
        .then(setCities);
    }
  }, [props.activeCountry]);

  return (
    <div id="cities-table-wrapper">
      {props.activeCountry === "" ? (
        <h2>
          Please select a country from the list to display its cities.
          Otherwise, press "all cities".
        </h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {cities?.map((city, index) => (
              <tr key={index}>
                <td>{city.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
