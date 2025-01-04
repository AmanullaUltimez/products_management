import React from "react";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

const NextAndPrev = ({currentPage, totalPages,  handlePrevPage, handleNextPage}) => {
    return (
        <div className="flex justify-center items-center py-4 gap-4">
                <button
                    className="text-white bg-gray-600 px-4 py-2 rounded-md flex justify-around items-center"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <GrFormPreviousLink/>
                    Previous
                    
                </button>
                <span className="text-white bg-gray-900 px-4 py-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="text-white bg-gray-600 px-4 py-2 rounded-md flex justify-around items-center"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <GrFormNextLink/>
                </button>
            </div>
    )
}

export default NextAndPrev