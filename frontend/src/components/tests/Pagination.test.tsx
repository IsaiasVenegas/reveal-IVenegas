import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Pagination } from "../Pagination";

test("renders buttons", async () => {
  render(
    <Pagination
      page={0}
      setStatePage={() => {}}
      sizeOptions={[10, 12, 20]}
      pageSize={10}
      setStatePageSize={() => {}}
      count={10}
      lastPage={0}
      leftRange={[]}
      rightRange={[]}
    />
  );
  const buttons = await screen.findAllByRole("button");
  expect(buttons).toHaveLength(5);
});

test("calls setter when the button is clicked", async () => {
  const setCurrentPage = jest.fn();
  render(
    <Pagination
      page={5}
      setStatePage={setCurrentPage}
      sizeOptions={[10, 12, 20]}
      pageSize={10}
      setStatePageSize={() => {}}
      count={100}
      lastPage={9}
      leftRange={[]}
      rightRange={[]}
    />
  );
  fireEvent.click(screen.getByTitle("Go to next page"));
  fireEvent.click(screen.getByTitle("Go to previous page"));
  fireEvent.click(screen.getByTitle("Go to last page"));
  fireEvent.click(screen.getByTitle("Go to first page"));
  await waitFor(() => expect(setCurrentPage).toHaveBeenCalledTimes(4));
});

test("calls setter when the selector is changed", async () => {
  const setPageSize = jest.fn();
  render(
    <Pagination
      page={0}
      setStatePage={() => {}}
      sizeOptions={[10, 12, 20]}
      pageSize={12}
      setStatePageSize={setPageSize}
      count={24}
      lastPage={1}
      leftRange={[]}
      rightRange={[]}
    />
  );
  const dropdown = screen.getByTestId("select") as HTMLSelectElement;
  expect(dropdown.value).toEqual("12");
  fireEvent.change(dropdown, {
    target: { value: "20" },
  });
  expect(setPageSize).toBeCalled();
});
