const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center items-center mt-20 ">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded shadow hover:shadow-2xl hover:scale-110 duration-500"
        >
          Previous
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-4 py-2 mx-1 rounded shadow hover:shadow-2xl hover:scale-110 duration-500  ${currentPage === number ? 'bg-colorPrimary text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-200 text-gray-800 rounded shadow hover:shadow-2xl hover:scale-110 duration-500"
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;