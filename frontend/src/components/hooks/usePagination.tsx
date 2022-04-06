import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../Pagination";

/**
 * Manage table pages by calculating the number of elements
 * to display from the total number of elements and
 * the selected page size
 * @param country Country name
 * @param total Total number of elements
 * @returns
 */
export const usePagination = (country: string, total: number) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const sizeOptions = [10, 12, 20];
  const [pageSize, setPageSize] = useState<number>(sizeOptions[0]);

  // Set actual page state to zero when country or page size has changed
  useEffect(() => {
    setCurrentPage(0);
  }, [country, pageSize]);

  // List of buttons displayed at left and right of current page
  const [leftRange, setLeftRange] = useState<number[]>([]);
  const [rightRange, setRightRange] = useState<number[]>([]);
  const rangeMax = 2;

  // Calculate last page using the total number of elements and page size
  const lastPage = useMemo(() => {
    if (Math.floor(total / pageSize) === total / pageSize) {
      return Math.floor(total / pageSize) - 1;
    }
    return Math.floor(total / pageSize);
  }, [total, pageSize]);

  // Update buttons at left and right of current page
  useEffect(() => {
    // Compute even distribution of pages at left and at right of current page
    // Add at most range max
    let upperLimit =
      currentPage + rangeMax <= lastPage ? currentPage + rangeMax : lastPage;
    let lowerLimit = currentPage - rangeMax >= 0 ? currentPage - rangeMax : 0;
    let rightCount = upperLimit - currentPage;
    let leftCount = currentPage - lowerLimit;

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
    for (let i = lowerLimit; i < currentPage; i++) {
      leftPages.push(i);
    }
    for (let i = currentPage + 1; i <= upperLimit; i++) {
      rightPages.push(i);
    }

    setLeftRange(leftPages);
    setRightRange(rightPages);
  }, [currentPage, lastPage]);

  return [
    <Pagination
      page={currentPage}
      setStatePage={setCurrentPage}
      sizeOptions={sizeOptions}
      pageSize={pageSize}
      setStatePageSize={setPageSize}
      count={total}
      lastPage={lastPage}
      leftRange={leftRange}
      rightRange={rightRange}
    />,
    currentPage,
    pageSize,
  ];
};
