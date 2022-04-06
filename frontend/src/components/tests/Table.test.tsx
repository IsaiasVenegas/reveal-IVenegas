import { render, screen } from "@testing-library/react";
import { Table } from "../Table";

test("renders title headers", () => {
  render(<Table activeCountry={{ name: "test", count: 1 }} />);
  const firstHeader = screen.getByText("City");
  const secondHeader = screen.getByText("Country");
  const thirdHeader = screen.getByText("Sub-country");
  const fourthHeader = screen.getByText("Website");
  expect(firstHeader).toBeInTheDocument();
  expect(secondHeader).toBeInTheDocument();
  expect(thirdHeader).toBeInTheDocument();
  expect(fourthHeader).toBeInTheDocument();
});
