import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
//import useAuth from "../../hooks/useAuth";
//import Loader from "../../components/Loader/Loader";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/user/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };


  
//   const handleInfo=(info)=>{
    


//   }

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/user/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const [selectedData, setSelectedData] = useState(null)
  return (
    <div>
      <h1>All Users</h1>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>User Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-colorPrimary"
                    >
                      <FaUsers
                        className="text-white 
                                        text-2xl"
                      ></FaUsers>
                    </button>
                  )}
                </td>
                <td>
                  {/* The button to open modal */}
                  <label htmlFor="my_modal_6" onClick={() => setSelectedData(user)} className="btn btn-ghost btn-sm bg-colorPrimary text-white">
                    See Info
                  </label>

                  {/* Put this part before </body> tag */}
                  {selectedData &&( <><input
                            type="checkbox"
                            id="my_modal_6"
                            className="modal-toggle " /><div className="modal" role="dialog">
                                
                                <div className="modal-box bg-colorPrimary">
                                <div className="flex items-center justify-center">
                                    <img className="max-w-96 rounded-3xl" src={selectedData.avatar} alt="" />
                                </div>
                                    <h3 className="text-xl font-medium tracking-tight text-white mt-6">Name: {selectedData.name}</h3>
                                    <p className="text-blue-200 mt-4"> Email: {selectedData.email}
                                    </p>
                                    <p className="text-blue-200 mt-4">Blood Group: {selectedData.bloodGroup}
                                    </p>
                                    <p className="text-blue-200 mt-4">Address: {selectedData?.district}, {selectedData?.upazila}.</p>

                                    <div className="modal-action">
                                        <label htmlFor="my_modal_6" className="btn my-6 bg-[#2c8ac9] text-white hover:bg-black">
                                            Close!
                                        </label>
                                    </div>
                                </div>
                            </div></> )}
                  
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
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

export default AllUsers;
