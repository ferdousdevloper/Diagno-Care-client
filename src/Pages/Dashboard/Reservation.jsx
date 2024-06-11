import { useQuery } from "@tanstack/react-query";
//import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
//import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

//------------------------------------------------------------------

//----------------------------------------------------------------

const Reservation = () => {
  //const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  //const { register, handleSubmit } = useForm();

  const { refetch, data: appointment = [] } = useQuery({
    queryKey: ["reserve"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appointments`);
      return res.data;
    },
  });
  
//----------------------------------------------------------

//TODO SEARCH METHOD ============================
//-----------------------------------------------------------------

  



  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/appointments/${item._id}`);
        // console.log(res.data);
        refetch();
        if (res.data.deletedCount > 0) {
          // refetch to update the ui

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.title} has been canceled`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };


  return (
    <div>
      <div className="overflow-x-auto">
      <h1 className="text-6xl fontBebas font-extrabold text-center mb-10">
        RESERVATION
      </h1>
      <hr />
      <form
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-delay="1000"
        //onSubmit={handleSearch}
        className="flex gap-1 items-center justify-center mx-auto my-10"
      >
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search by email"
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
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Patient Information</th>
              <th>Test Delivery Status</th>
              <th>Cancel Reservation</th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((i, index) => (
              <tr key={i._id} className="border-b border-2">
                <th>{index + 1}</th>
                <td>{i.title}</td>
                <td>
                  <div>
                    <p>Name: {i.name}</p>
                    <p>Email: {i.email}</p>
                  </div>
                </td>
                <td>
                  {i.report === "delivered" ? (
                    <p className="btn bg-green-600 text-white btn-sm ml-4">
                      Delivered
                    </p>
                  ) : (
                    <Link to={`/dashboard/reservation/${i._id}`}>
                      <button
                        // onClick={() => handleMakeDelivered(i)}
                        className="btn btn-sm bg-colorPrimary"
                      >
                        <p className="text-white">Make Test Report</p>
                      </button>
                    </Link>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(i)}
                    className="btn bg-red-600 text-white"
                  >
                    Cancel Reservation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservation;
