import { PaginationProps } from "./types";

/**
 * Pagination component
 * Display a list of buttons and a page size selector
 * Set current page and page size
 * @param props
 * @returns
 */
export const Pagination = (props: PaginationProps) => {
  return (
    <div>
      <div className="page navigation">
        <button
          type="button"
          disabled={0 === props.page}
          onClick={() => props.setStatePage(0)}
          title="Go to first page"
          aria-labelledby="first page button"
        >
          &lt;&lt;
        </button>
        <button
          type="button"
          disabled={0 === props.page}
          onClick={() => props.setStatePage(props.page - 1)}
          title="Go to previous page"
          aria-labelledby="previous page button"
        >
          &lt;
        </button>
        {props.leftRange.map((el, key) => (
          <button
            type="button"
            key={"left" + key}
            onClick={() => props.setStatePage(el)}
            aria-labelledby="page at left of current page"
          >
            {el + 1}
          </button>
        ))}

        <button
          type="button"
          className="primary"
          aria-labelledby="current page button"
        >
          {props.page + 1}
        </button>

        {props.rightRange.map((el, key) => (
          <button
            type="button"
            key={"right" + key}
            onClick={() => props.setStatePage(el)}
            aria-labelledby="page at right of current page"
          >
            {el + 1}
          </button>
        ))}
        <button
          type="button"
          disabled={props.lastPage < props.page + 1}
          onClick={() => props.setStatePage(props.page + 1)}
          title="Go to next page"
          aria-labelledby="next page button"
        >
          &gt;
        </button>
        <button
          type="button"
          disabled={props.lastPage < props.page + 1}
          onClick={() => props.setStatePage(props.lastPage)}
          title="Go to last page"
          aria-labelledby="last page button"
        >
          &gt;&gt;
        </button>
      </div>
      <select
        name="page size selector"
        aria-labelledby="page size selector"
        id="selectItems"
        value={props.pageSize}
        onChange={(e) => props.setStatePageSize(Number(e.target.value))}
        data-testid="select"
      >
        <option
          key={0}
          value={10}
          data-testid="select-option"
          aria-labelledby="page size 10"
        >
          10
        </option>
        <option
          key={1}
          value={12}
          data-testid="select-option"
          aria-labelledby="page size 12"
        >
          12
        </option>
        <option
          key={2}
          value={20}
          data-testid="select-option"
          aria-labelledby="page size 20"
        >
          20
        </option>
      </select>
      <label htmlFor="selectItems" aria-labelledby="page size label">
        Items per page
      </label>
    </div>
  );
};
