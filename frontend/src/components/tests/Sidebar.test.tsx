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

test("set 'all' as active country to avoid filtering cities", async () => {
  const setActiveCountry = jest.fn();
  render(
    <Sidebar
      activeCountry={{ name: "", count: 0 }}
      setActiveCountry={setActiveCountry}
    />
  );
  const button = await screen.findByText("All cities");
  fireEvent.click(button);
  expect(setActiveCountry).toHaveBeenCalledWith({ name: "all", count: 500 });
});

test("set first country of the list to filter cities", async () => {
  const setActiveCountry = jest.fn();
  render(
    <Sidebar
      activeCountry={{ name: "", count: 0 }}
      setActiveCountry={setActiveCountry}
    />
  );
  const buttons = await screen.findAllByRole("button");
  fireEvent.click(buttons[1]);
  expect(setActiveCountry).toHaveBeenCalledWith({
    name: "Afghanistan",
    count: 48,
  });
});
