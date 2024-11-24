import { useState } from "react";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */

const Pagination = ({ arrayOfPages, query, page }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pagesPerGroup = 3;

  const handleClick = (pageNo) => {
    setCurrentPage(pageNo);
    if (pageNo !== currentPage) {
      query?.setPageNo(pageNo);
      page === "recipes" && query?.triggerRecipes(pageNo);
      page === "categories" && query?.triggerCategories(pageNo);
      page === "users" && query?.triggerUsers(pageNo);
    }
  };

  const handleNext = () => {
    if (currentPage < arrayOfPages.length) {
      handleClick(currentPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      handleClick(currentPage - 1);
    }
  };
  const startIndex = Math.floor(
    ((currentPage - 1) / pagesPerGroup) * pagesPerGroup
  );
  const visiblePages = arrayOfPages.slice(
    startIndex,
    startIndex + pagesPerGroup
  );
  return (
    <nav aria-label="Page navigation" className="pt-5">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to="#"
            aria-label="Previous"
            aria-disabled={currentPage === 1}
            onClick={handlePrevious}
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {visiblePages.map((pageNo) => (
          <li
            className={`page-item ${currentPage === pageNo ? "active " : ""}`}
            key={pageNo}
            onClick={() => handleClick(pageNo)}
          >
            <Link
              className="page-link"
              // to="#"
              to={`#${page}?page=${pageNo}`}
              aria-current={pageNo === currentPage ? "page" : undefined}
            >
              {pageNo}
            </Link>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === arrayOfPages.length ? "disabled" : ""
          }`}
        >
          <Link
            className="page-link"
            to="#"
            aria-label="Next"
            aria-disabled={currentPage === arrayOfPages.length}
            onClick={handleNext}
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
