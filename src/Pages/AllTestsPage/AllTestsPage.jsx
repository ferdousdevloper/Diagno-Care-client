import { useEffect, useState } from "react";
import useAllTest from "../../hooks/useAllTest";
import { Link } from "react-router-dom";

const AllTestsPage = () => {
  const allTests = useAllTest([]);
  const allTestsData = allTests[0];
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const futureData = allTestsData.filter(
      (item) => new Date(item.date) >= currentDate
    );
    setFilteredData(futureData);
  }, [allTestsData]);

  return (
    <div className="py-40">
      <div className="container mx-auto ">
        <h1 className="text-6xl fontBebas font-extrabold text-center">
          ALL TESTES
        </h1>
        <h1>{filteredData.length}</h1>
        <div>
          <div className="grid md:grid-cols-3 gap-10">
            {filteredData.map((i) => (
              <div key={i._id} className="flex flex-col transition duration-300 bg-white rounded shadow-2xl hover:shadow">
                <div className="relative w-full h-48">
                  <img
                    src={i.image}
                    className="object-cover w-full h-full rounded-t"
                    alt="Plan"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow p-8 border border-t-0 rounded-b">
                  <div>
                    <div className="text-lg font-semibold">{i.title}</div>
                    <p className="text-sm text-gray-900">
                      {i.shortDescription}
                    </p>
                    <div className="mt-1 mb-4 mr-1 text-xl">
                      Available slots: {i.slots}
                    </div>
                    <div className="mt-1 mb-4 mr-1 text-2xl font-bold">
                      Test price: ${i.price}
                    </div>
                  </div>
                  <div className="card-actions justify-end">
                    <Link to={`/allTests/${i._id}`} className="btn btn-primary">
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
        </div>
      </div>
    </div>
  );
};

export default AllTestsPage;
