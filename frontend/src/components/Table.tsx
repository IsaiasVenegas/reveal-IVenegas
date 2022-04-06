import "./Table.css";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: number;
};

type Country = {
  name: string;
  count: number;
};
interface IProps {
  activeCountry: Country;
}

export const Table = (props: IProps) => {
  const [cities, setCities] = useState<City[] | null>(null);
  const [actualPage, setActualPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    if (props.activeCountry.name !== "") {
      let api = "http://localhost:3001/api/cities";
      let pagination = `?from=${actualPage * pageSize}&limit=${pageSize}`;
      let country =
        props.activeCountry.name === "all"
          ? ""
          : `&country=${props.activeCountry.name}`;
      fetch(`${api}${pagination}${country}`)
        .then((response) => response.json())
        .then(setCities);
    }
  }, [props.activeCountry, actualPage, pageSize]);

  useEffect(() => {
    setActualPage(0);
  }, [props.activeCountry, pageSize]);

  return (
    <div id="cities-table-wrapper">
      {props.activeCountry.name === "" ? (
        <h2>
          Please select a country from the list to display its cities.
          Otherwise, press "all cities".
        </h2>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Country</th>
                <th>Sub-country</th>
                <th>Website</th>
              </tr>
            </thead>
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
                    >
                      See it in Geonames website
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={actualPage}
            setStatePage={setActualPage}
            count={props.activeCountry.count}
            pageSize={pageSize}
            setStatePageSize={setPageSize}
          />
        </div>
      )}
    </div>
  );
};
