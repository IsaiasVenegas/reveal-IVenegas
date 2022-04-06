import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IProps {
  page: number;
  count: number;
  pageSize: number;
  setStatePage: Dispatch<SetStateAction<number>>;
  setStatePageSize: Dispatch<SetStateAction<number>>;
}

export const Pagination = (props: IProps) => {
  const [leftRange, setLeftRange] = useState<number[]>([]);
  const [rightRange, setRightRange] = useState<number[]>([]);
  const rangeMax = 2;

  const maxPage =
    Math.floor(props.count / props.pageSize) === props.count / props.pageSize
      ? Math.floor(props.count / props.pageSize) - 1
      : Math.floor(props.count / props.pageSize);

  const changePage = (direction: number) => {
    if (direction < 0) {
      if (props.page > 0) {
        props.setStatePage(props.page - 1);
      }
    } else {
      if (maxPage >= props.page + 1) {
        props.setStatePage(props.page + 1);
      }
    }
    goTop();
  };

  const setPage = (number: number) => {
    props.setStatePage(number);
    goTop();
  };

  const setPageSize = (number: number) => {
    props.setStatePageSize(number);
    goTop();
  };

  useEffect(() => {
    // Compute even distribution of pages at left and at right of current page
    // Add at most range max
    let upperLimit =
      props.page + rangeMax <= maxPage ? props.page + rangeMax : maxPage;
    let lowerLimit = props.page - rangeMax >= 0 ? props.page - rangeMax : 0;
    let rightCount = upperLimit - props.page;
    let leftCount = props.page - lowerLimit;

    // Add remaining page count to the right if there's no space by the left
    let tmp;
    if (leftCount < rangeMax) {
      tmp = rangeMax - leftCount; // diff
      upperLimit = upperLimit + tmp <= maxPage ? upperLimit + tmp : maxPage;
    }

    // Add remaining page count to the left if there's no space by the right
    if (rightCount < rangeMax) {
      tmp = rangeMax - rightCount; // diff
      lowerLimit = lowerLimit - tmp >= 0 ? lowerLimit - tmp : 0;
    }

    let leftPages: number[] = [],
      rightPages: number[] = [];
    for (let i = lowerLimit; i < props.page; i++) {
      leftPages.push(i);
    }
    for (let i = props.page + 1; i <= upperLimit; i++) {
      rightPages.push(i);
    }

    setLeftRange(leftPages);
    setRightRange(rightPages);
  }, [props.page, maxPage, rangeMax]);

  return (
    <div>
      <div className="page navigation">
        <button
          disabled={0 === props.page}
          onClick={() => setPage(0)}
          title="Go to first page"
        >
          &lt;&lt;
        </button>
        <button
          disabled={0 === props.page}
          onClick={() => changePage(-1)}
          title="Go to previous page"
        >
          &lt;
        </button>
        {leftRange.map((el, key) => (
          <button key={"left" + key} onClick={() => setPage(el)}>
            {el + 1}
          </button>
        ))}

        <button className="primary">{props.page + 1}</button>

        {rightRange.map((el, key) => (
          <button key={"right" + key} onClick={() => setPage(el)}>
            {el + 1}
          </button>
        ))}
        <button
          disabled={maxPage < props.page + 1}
          onClick={() => changePage(1)}
          title="Go to next page"
        >
          &gt;
        </button>
        <button
          disabled={maxPage < props.page + 1}
          onClick={() => setPage(maxPage)}
          title="Go to last page"
        >
          &gt;&gt;
        </button>
      </div>
      <select
        name="page size selector"
        id="selectItems"
        onChange={(e) => setPageSize(Number(e.target.value))}
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

const goTop = () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
