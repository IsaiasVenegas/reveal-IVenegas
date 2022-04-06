export const getCountries = () => {
  return fetch("http://localhost:3001/api/countries").then((response) =>
    response.json()
  );
};

export const getCities = (options = "") => {
  return fetch(`http://localhost:3001/api/cities${options}`).then((response) =>
    response.json()
  );
};
