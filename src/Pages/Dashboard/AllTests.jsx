import { FaTrashAlt } from "react-icons/fa";
import useAllTest from "../../hooks/useAllTest";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTests = () => {
  const [allTests, refetch] = useAllTest();
  const axiosSecure = useAxiosSecure();
  console.log(allTests);
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/allTests/${item._id}`);
        // console.log(res.data);
        refetch();
        if (res.data.deletedCount > 0) {
          // refetch to update the ui

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <h1 className="text-6xl fontBebas font-extrabold text-center">
        ALL TESTS
      </h1>
      <div className="overflow-x-auto border rounded-2xl shadow-2xl  my-6">
        <table className="table ">
          {/* head */}
          <thead>
            <tr>
              <th>Images</th>
              <th>Info</th>
              <th>Price</th>
              <th>Reservation</th>
              <th>Available Slots</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              // eslint-disable-next-line react/no-unknown-property
              allTests.map((i) => (
                <tr key={i._id} className="shadow-2xl">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask  w-40 h-40">
                          <img src={i.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{i.title}</div>
                      <div className="text-sm opacity-50">
                        Date: {new Date(i.date).toLocaleDateString()}
                      </div>
                      <br />
                      <span className="">
                        {/* Description: {i.shortDescription.slice(0,80)}... */}
                      </span>
                    </div>
                  </td>
                  <td className="font-bold">Price: ${i?.price}</td>
                  <td className="font-bold">Reservation:</td>
                  <td className="font-bold">Slots: {i.slots}</td>
                  <th>
                    <Link to={`/dashboard/allTests/${i._id}`}>
                      <button className="btn btn-ghost btn-sm bg-colorPrimary text-white">
                        Update
                      </button>
                    </Link>
                  </th>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(i)}
                      className="btn btn-ghost btn-lg"
                    >
                      <FaTrashAlt className="text-red-600"></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTests;
