interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
  
      const visiblePages = 3;
      const half = Math.floor(visiblePages / 2);
  
      pages.push(1); // Always show first page
  
      let start = Math.max(2, currentPage - half);
      let end = Math.min(totalPages - 1, currentPage + half);
  
      // Adjust if near the beginning
      if (currentPage <= half + 1) {
        end = visiblePages;
      }
  
      // Adjust if near the end
      if (currentPage >= totalPages - half) {
        start = totalPages - visiblePages + 1;
      }
  
      if (start > 2) {
        pages.push("...");
      }
  
      for (let i = start; i <= end && i < totalPages; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
  
      if (end < totalPages - 1) {
        pages.push("...");
      }
  
      if (totalPages > 1) {
        pages.push(totalPages); // Always show last page
      }
  
      return pages;
    };
  
    return (
      <div>
        <div className="d-flex justify-content-center mt-3">
          <button
            className="pagination-button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
  
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`dots-${idx}`} className="pagination-button">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`pagination-button ${currentPage === page ? "active" : ""}`}
                onClick={() => onPageChange(Number(page))}
                disabled={currentPage === page}
              >
                {page}
              </button>
            )
          )}
  
          <button
            className="pagination-button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
  
        <br />
        <br />
        <div className="form-group">
          <label className="me-2">Results per page: </label>
          <select
            className="form-select w-auto d-inline-block"
            value={pageSize}
            onChange={(p) => {
              onPageSizeChange(Number(p.target.value));
              onPageChange(1); // Reset to first page when size changes
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  