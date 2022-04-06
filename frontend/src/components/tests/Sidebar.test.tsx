import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "../Sidebar";

test("renders filters", async () => {
  render(
    <Sidebar
      activeCountry={{ name: "", count: 0 }}
      setActiveCountry={() => {}}
    />
  );
  const buttons = await screen.findAllByRole("button");
  const expectedCountries = 244;
  expect(buttons).toHaveLength(1 + expectedCountries);
});

test("calls setter when a country is clicked", async () => {
  const setActiveCountry = jest.fn();
  render(
    <Sidebar
      activeCountry={{ name: "", count: 0 }}
      setActiveCountry={setActiveCountry}
    />
  );
  const button = await screen.findByText("All cities");
  fireEvent.click(button);
  expect(setActiveCountry).toBeCalled();
});
