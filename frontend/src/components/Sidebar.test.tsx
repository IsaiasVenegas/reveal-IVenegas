import { render, screen, fireEvent } from "@testing-library/react";
import { isPropertySignature } from "typescript";
import { Sidebar } from "./Sidebar";

test("renders filters", async () => {
  render(<Sidebar activeCountry="" setActiveCountry={() => {}} />);
  const buttons = await screen.findAllByRole("button");
  const expectedCountries = 244;
  expect(buttons).toHaveLength(1 + expectedCountries);
});
