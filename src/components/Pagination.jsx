import { Link } from "react-router"
import styles from "../styles/Pagination.module.css"
import { useEffect, useState } from "react";

const Pagination = (props) => {
    const [pageNumbers, setPageNumbers] = useState([])
    const {current, onPageChange, totalPages} = props;
    const currentPage = parseInt(current);
    const pagesMax = totalPages

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagesMax) {
            onPageChange(page); // Trigger callback with new page number
        }
    };

    // Function to calculate page numbers to display
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Number of pages to display at once
        const halfRange = Math.floor(maxVisiblePages / 2);

        let start = Math.max(1, currentPage - halfRange); // Start page
        let end = Math.min(pagesMax, currentPage + halfRange); // End page

        // Adjust the range if near the beginning or end
        if (currentPage <= halfRange) {
            end = Math.min(pagesMax, maxVisiblePages);
        }
        if (currentPage > pagesMax - halfRange) {
            start = Math.max(1, pagesMax - maxVisiblePages + 1);
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    useEffect(() => {
        setPageNumbers(getPageNumbers())
    }, [])

    if(totalPages === 1) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.paginationContainer}>
            {/* Previous Button */}
            <button
                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Page Numbers */}
            {currentPage > 3 && (
                <>
                    <button
                        className={styles.pageNumber}
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </button>
                    {currentPage > 4 && <span className={styles.ellipsis}>...</span>}
                </>
            )}

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`${styles.pageNumber} ${currentPage === page ? styles.active : ""}`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            {currentPage < pagesMax - 2 && (
                <>
                    {currentPage < pagesMax - 3 && <span className={styles.ellipsis}>...</span>}
                    <button
                        className={styles.pageNumber}
                        onClick={() => handlePageChange(pagesMax)}
                    >
                        {pagesMax}
                    </button>
                </>
            )}

            {/* Next Button */}
            <button
                className={`${styles.paginationButton} ${currentPage === pagesMax ? styles.disabled : ""}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagesMax}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;