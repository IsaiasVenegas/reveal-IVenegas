import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../Pagination";

export const usePagination = (country: string, total: number) => {
  const [actualPage, setActualPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    setActualPage(0);
  }, [country, pageSize]);

  const [leftRange, setLeftRange] = useState<number[]>([]);
  const [rightRange, setRightRange] = useState<number[]>([]);
  const rangeMax = 2;

  const lastPage = useMemo(() => {
    if (Math.floor(total / pageSize) === total / pageSize) {
      return Math.floor(total / pageSize) - 1;
    }
    return Math.floor(total / pageSize);
  }, [total, pageSize]);

  useEffect(() => {
    // Compute even distribution of pages at left and at right of current page
    // Add at most range max
    let upperLimit =
      actualPage + rangeMax <= lastPage ? actualPage + rangeMax : lastPage;
    let lowerLimit = actualPage - rangeMax >= 0 ? actualPage - rangeMax : 0;
    let rightCount = upperLimit - actualPage;
    let leftCount = actualPage - lowerLimit;

    // Add remaining page count to the right if there's no space by the left
    let tmp;
    if (leftCount < rangeMax) {
      tmp = rangeMax - leftCount; // diff
      upperLimit = upperLimit + tmp <= lastPage ? upperLimit + tmp : lastPage;
    }

    // Add remaining page count to the left if there's no space by the right
    if (rightCount < rangeMax) {
      tmp = rangeMax - rightCount; // diff
      lowerLimit = lowerLimit - tmp >= 0 ? lowerLimit - tmp : 0;
    }

    let leftPages: number[] = [],
      rightPages: number[] = [];
    for (let i = lowerLimit; i < actualPage; i++) {
      leftPages.push(i);
    }
    for (let i = actualPage + 1; i <= upperLimit; i++) {
      rightPages.push(i);
    }

    setLeftRange(leftPages);
    setRightRange(rightPages);
  }, [actualPage, lastPage]);

  return [
    <Pagination
      page={actualPage}
      setStatePage={setActualPage}
      pageSize={pageSize}
      setStatePageSize={setPageSize}
      count={total}
      lastPage={lastPage}
      leftRange={leftRange}
      rightRange={rightRange}
    />,
    actualPage,
    pageSize,
  ];
};
