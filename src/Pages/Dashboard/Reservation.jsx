import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
//import Reservation from './Reservation';

const Reservation = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const { refetch, data: appointment = [] } = useQuery({
    queryKey: ["reserve"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
      return res.data;
    },
  });

  //const { _id } = appointment;
  console.log(appointment)
  //for report delivered
  const handleMakeDelivered = (i) => {
    const reportStatus ={
      report: i.report.report,
    }
    axiosSecure.patch(`/appointments/report/${i._id}`, reportStatus).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${i.report} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
        const res = await axiosSecure.delete(`/appointments/${item._id}`);
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
      <h1>Reservation{appointment.length}</h1>
      <div className="overflow-x-auto">
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
                      onClick={() => handleMakeDelivered(i)}
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
