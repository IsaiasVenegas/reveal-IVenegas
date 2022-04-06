import "./Table.css";
import { TableProps } from "./types";
import { useCities, usePagination } from "./hooks";

export const Table = (props: TableProps) => {
  const [pagination, actualPage, pageSize] = usePagination(
    props.activeCountry.name,
    props.activeCountry.count
  );
  const cities = useCities(
    props.activeCountry.name,
    Number(actualPage),
    Number(pageSize)
  );

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
            {cities}
          </table>
          {pagination}
        </div>
      )}
    </div>
  );
};
