import { useEffect, useState } from "react";
import useAllTest from "../../hooks/useAllTest";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import { Helmet } from "react-helmet";

const AllTestsPage = () => {
  const allTests = useAllTest([]);
  const allTestsData = allTests[0];
  const [filteredData, setFilteredData] = useState([]);
  //---------------------PAGINATION---------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

    

 // Calculate total pages
 const totalPages = Math.ceil(filteredData.length / itemsPerPage);

 // Get current items
 const startIndex = (currentPage - 1) * itemsPerPage;
 const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

 const handlePageChange = (page) => {
   if (page >= 1 && page <= totalPages) {
     setCurrentPage(page);
   }
 };

 useEffect(() => {
   const currentDate = new Date();
   if (Array.isArray(allTestsData)) {
     const futureData = allTestsData.filter(
       (item) => new Date(item.date) >= currentDate
     );
     setFilteredData(futureData);
   }
 }, [allTestsData]); // Ensure this dependency is stable

  //----------------------------------------------------------

//TODO SEARCH METHOD ============================
//-----------------------------------------------------------------


  return (
    <div className="py-40">
      <Helmet>
        <title>Diagno Care | All Tests</title>
      </Helmet>
      <div className="md:container md:mx-auto mx-5">
        <h1 className="text-2xl md:text-6xl fontBebas font-extrabold text-center">
          ALL TESTES
        </h1>
        {/* TODO================================== */}
        <form
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="1000"
        //onSubmit={handleSearch}
        className="flex gap-1 items-center justify-center mx-auto my-10"
      >
        <label className="input input-bordered flex items-center gap-2 w-1/2">
          <input
            type="text"
            className="grow w-full"
            placeholder="Search"
            //onChange={(e) => setSearchText(e.target.value)}
            //value={searchText}
            name="search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-colorPrimary rounded-md hover:bg-black focus:bg-gray-600 focus:outline-none">
          Search
        </button>
      </form>
        <div>
          <div className="grid md:grid-cols-3 gap-10">
            {currentItems.map((i) => (
              <div key={i._id} className="flex flex-col transition duration-300 bg-white  shadow-xl hover:shadow rounded-bl-[100px] border-b-[10px] border-colorPrimary">
                <div className="relative w-full h-48">
                  <img
                    src={i.image}
                    className="object-cover w-full h-full rounded-t"
                    alt="Plan"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow p-8">
                  <div className="py-2">
                    <div className="text-4xl font-semibold mb-4">{i.title}</div>
                    <p className="text-sm text-gray-900 ">
                      <strong>Description: </strong>{i.shortDescription}
                    </p>
                    <div className="mt-1 mb-4 mr-1 text-xl">
                      <strong>Available slots:</strong> <span className="text-colorPrimary font-extrabold">{i.slots}</span>
                    </div>
                    <div className="mt-1 mb-4 mr-1 text-2xl font-bold ">
                    Test price: <span className="text-colorPrimary font-extrabold">${i.price}</span>  
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <Link to={`/allTests/${i._id}`} className="btn bg-colorPrimary text-white hover:bg-black px-14">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
              /*
              <div key={i._id}>
                <div className="card bg-base-100 shadow-xl">
                  <figure>
                    <img src={i.image} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{i.title}</h2>
                    <p>{i.shortDescription}</p>
                    <p>Date: {new Date(i.date).toLocaleDateString()}</p>
                    <p>Available slots: {i.slots}</p>

                    <div className="card-actions justify-end">
                      <Link
                      to={`/allTests/${i._id}`}
                      className="btn btn-primary">Details</Link>
                    </div>
                  </div>
                </div>
              </div>*/
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default AllTestsPage;
