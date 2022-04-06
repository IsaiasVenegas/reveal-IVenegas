import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Pagination } from "./Pagination";

test("renders buttons", async () => {
  render(
    <Pagination
      page={0}
      count={10}
      pageSize={10}
      setStatePage={() => {}}
      setStatePageSize={() => {}}
    />
  );
  const buttons = await screen.findAllByRole("button");
  expect(buttons).toHaveLength(5);
});

test("changes page", async () => {
  const setActualPage = jest.fn();
  render(
    <Pagination
      page={0}
      count={100}
      pageSize={10}
      setStatePage={setActualPage}
      setStatePageSize={() => {}}
    />
  );
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation((actualPage) => [actualPage, setActualPage]);
  fireEvent.click(screen.getByTitle("Go to last page"));
  expect(setActualPage).toBeCalled();
});

// test("changes page size", async () => {
//   const setPageSize = jest.fn();
//   render(
//     <Pagination
//       page={0}
//       count={100}
//       pageSize={10}
//       setStatePage={() => {}}
//       setStatePageSize={setPageSize}
//     />
//   );
//   const handleClick = jest.spyOn(React, "useState");
//   handleClick.mockImplementation((pageSize) => [pageSize, setPageSize]);
//   userEvent.selectOptions(screen.getByLabelText("10"), "20");
//   expect((screen.getByText("20") as HTMLOptionElement).selected).toBeTruthy();
//   expect((screen.getByText("10") as HTMLOptionElement).selected).toBeFalsy();
//   expect(setPageSize).toBeCalled();
// });
