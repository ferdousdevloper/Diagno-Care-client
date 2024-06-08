
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const MyAppointments = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
 

   const { refetch, data: test = [] } = useQuery({
     queryKey: ["appointment"],
     queryFn: async () => {
       const res = await axiosSecure.get(`/appointment/${user?.email}`);
       return res.data;
     },
   });
   const item = test.filter(item => item.report === "pending")
   

   
  console.log(item);

  
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
      <h1>MY UPCOMMING APPOINMENTS</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Test Information</th>
              <th>Your Information</th>
              <th>Test Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {item.map((i, index) => (
              <tr key={i._id} className="border-b border-2">
                <th>{index + 1}</th>
                <td className="text-3xl font-bold">{i.title}</td>
                <td className="text-base font-semibold">
                  <div>
                    <p>
                      {" "}
                      <strong>Date:</strong> {i.date}
                    </p>
                    <p>
                      <strong>Price:</strong> ${i.price}
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>
                      {" "}
                      <strong>Name:</strong> {i.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {i.email}
                    </p>
                    <p>
                      <strong>Blood Group:</strong> {i.bloodGroup}
                    </p>
                    <p>
                      <strong>Address:</strong> {i.district}, {i.upazila}
                    </p>
                  </div>
                </td>
                <td>
                  <p className="border btn btn-warning text-white font-bold text-base">
                    Pending
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(i)}
                    className="btn bg-red-600 text-white"
                  >
                    Cancel Appointment
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

export default MyAppointments;
