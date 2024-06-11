import { FaTrashAlt, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import jsPDF from "jspdf";
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
    Swal.fire({
      title: "Are you sure?",
      text: "Make Admin??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!!",
    }).then((result) => {
      if (result.isConfirmed) {
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
      }
    });
  };
  const handleMakeBlock = (user) => {
    axiosSecure.patch(`/user/block/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Blocked");
      }
    });
  };
  const handleMakeActive = (user) => {
    axiosSecure.patch(`/user/active/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Successfully user Active");
        // Swal.fire({
        //   position: "top-end",
        //   icon: "success",
        //   title: `${user.name} is an Admin Now!`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
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


  // for pdf to get all appointments data///////////////////////////////////////////////////
  //===========================================================================================

  const appointments = useLoaderData([]);

  console.log(appointments);

  const [selectedData, setSelectedData] = useState(null);
  const [userSelectedData, setUserSelectedData] = useState(null);

  console.log(selectedData);

  const appointmentArray = Array.isArray(appointments) ? appointments : [];

  const filterData = selectedData
    ? appointmentArray.filter((item) => item.email === selectedData.email)
    : [];
  console.log(filterData);

  const bothHandleClick = (user, filterData) => {
    generatePdf(filterData);
    setSelectedData(user);
  };
  //console.log(selectedData.name);
  const generatePdf = (user) => {
    
    //console.log(filterData?.title);
    const doc = new jsPDF();
    // doc.text("Test Title: " + filterData?.title, 10, 10);
    // doc.text("Test Title: " + filterData?.title, 10, 20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("DIAGNO CARE", 105, 10, null, null, "center");
    doc.line(10, 20, 200,  20);
    doc.setFontSize(12);
    doc.text("Patient Name: " + selectedData?.name, 10, 40);
    doc.text("Patient email: " + selectedData?.email, 10, 50);
    doc.text("Blood Group: " + selectedData?.bloodGroup, 10, 60);
    doc.text("District: " + selectedData?.district, 10, 70);
    doc.text("Upazila: " + selectedData?.upazila, 10, 80);
    if (selectedData?.avatar) {
      doc.addImage(selectedData?.avatar, 'jpg', 150, 30, 50, 50); // Adjust position and size
    }
    doc.line(10, 90, 200,  90);

    doc.text(`Total Delivered: ${filterData.length}`, 10, 100);
    doc.setFontSize(8);
    filterData.forEach((item, index) => {
      const initialYPosition = 110 + index * 30;
      let yPosition = initialYPosition;
      const itemHeight = 60; // Estimated height needed for each item (adjust as needed)

        // Check if adding this item will exceed page height
        if (yPosition + itemHeight > doc.internal.pageSize.height - 20) {
          doc.addPage();
          yPosition = 20; // Reset yPosition for new page
        }
     
      yPosition += 5;
      doc.text(`Test Name: ${item.title}`, 15, yPosition);
      yPosition += 5;
      doc.text(`Description: ${item.shortDescription}`, 15, yPosition);
      yPosition += 5;
      doc.text(`Date: ${item.date}`, 15, yPosition);
      yPosition += 5;
      doc.text(`Price : $${item.price}`, 15, yPosition);
      yPosition += 5;
      doc.text(`Report Status : ${item.report}`, 15, yPosition);
      yPosition += 5;
      doc.line(15, yPosition, 200,  yPosition);
      
    });
    
    

    doc.save("User_Report.pdf");
  };
  ////////////////////////////////////////////////////////////
  //===========================================================

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
              <th>Status</th>
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
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleMakeBlock(user)}
                      className="btn btn-sm bg-green-500 text-white"
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeActive(user)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Block
                    </button>
                  )}
                </td>
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
                  <label
                    htmlFor="my_modal_6"
                    onClick={() => setUserSelectedData(user)}
                    className="btn btn-ghost btn-sm bg-colorPrimary text-white"
                  >
                    See Info
                  </label>

                  {/* Put this part before </body> tag */}
                  {userSelectedData && (
                    <>
                      <input
                        type="checkbox"
                        id="my_modal_6"
                        className="modal-toggle "
                      />
                      <div className="modal" role="dialog">
                        <div className="modal-box bg-colorPrimary">
                          <div className="flex items-center justify-center">
                            <img
                              className="max-w-96 rounded-3xl"
                              src={userSelectedData.avatar}
                              alt=""
                            />
                          </div>
                          <h3 className="text-xl font-medium tracking-tight text-white mt-6">
                            Name: {userSelectedData.name}
                          </h3>
                          <p className="text-blue-200 mt-4">
                            {" "}
                            Email: {userSelectedData.email}
                          </p>
                          <p className="text-blue-200 mt-4">
                            Blood Group: {userSelectedData.bloodGroup}
                          </p>
                          <p className="text-blue-200 mt-4">
                            Address: {userSelectedData?.district},{" "}
                            {userSelectedData?.upazila}.
                          </p>

                          <div className="modal-action">
                            <label
                              htmlFor="my_modal_6"
                              className="btn my-6 bg-[#2c8ac9] text-white hover:bg-black"
                            >
                              Close!
                            </label>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
                <td>
                  <label
                    onClick={() => bothHandleClick(user)}
                    className="btn btn-ghost btn-sm bg-colorPrimary text-white"
                  >
                    Download record
                  </label>
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
