import { PaginationProps } from "./types";

export const Pagination = (props: PaginationProps) => {
  return (
    <div>
      <div className="page navigation">
        <button
          disabled={0 === props.page}
          onClick={() => props.setStatePage(0)}
          title="Go to first page"
        >
          &lt;&lt;
        </button>
        <button
          disabled={0 === props.page}
          onClick={() => props.setStatePage(props.page - 1)}
          title="Go to previous page"
        >
          &lt;
        </button>
        {props.leftRange.map((el, key) => (
          <button key={"left" + key} onClick={() => props.setStatePage(el)}>
            {el + 1}
          </button>
        ))}

        <button className="primary">{props.page + 1}</button>

        {props.rightRange.map((el, key) => (
          <button key={"right" + key} onClick={() => props.setStatePage(el)}>
            {el + 1}
          </button>
        ))}
        <button
          disabled={props.lastPage < props.page + 1}
          onClick={() => props.setStatePage(props.page + 1)}
          title="Go to next page"
        >
          &gt;
        </button>
        <button
          disabled={props.lastPage < props.page + 1}
          onClick={() => props.setStatePage(props.lastPage)}
          title="Go to last page"
        >
          &gt;&gt;
        </button>
      </div>
      <select
        name="page size selector"
        id="selectItems"
        onChange={(e) => props.setStatePageSize(Number(e.target.value))}
        data-testid="select"
      >
        <option
          key={0}
          value={10}
          selected={props.pageSize === 10}
          data-testid="select-option"
        >
          10
        </option>
        <option
          key={1}
          value={12}
          selected={props.pageSize === 12}
          data-testid="select-option"
        >
          12
        </option>
        <option
          key={2}
          value={20}
          selected={props.pageSize === 20}
          data-testid="select-option"
        >
          20
        </option>
      </select>
      <label htmlFor="selectItems">Items per page</label>
    </div>
  );
};
