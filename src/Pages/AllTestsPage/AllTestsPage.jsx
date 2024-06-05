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
          <div className="grid grid-cols-3 gap-10">
            {filteredData.map((i) => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTestsPage;
