import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
//import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const MakeReport = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  //const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const report = useLoaderData();
  console.log(report._id);

  const onSubmit = async (data) =>{

    const reportItem = {
        report: data.report,
        reportLink: data.reportLink,
        
    }
    const reportUpdate = await axiosPublic.patch(`/appointments/${report._id}`, reportItem);
        console.log(reportUpdate.data)
        if(reportUpdate.data.modifiedCount > 0){
            // show success popup
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is updated to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
              
              navigate("/dashboard/reservation")
              
        }
        console.log( 'banner update', data);
  }

  return (
    <div>
      <h1>make report</h1>

      <section className="h-screen bg-gray-100/50">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container max-w-2xl mx-auto shadow-md md:w-3/4"
        >
          <div className="p-4 border-t-2 border-indigo-400 rounded-lg bg-gray-100/5 ">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <a href="#" className="relative block">
                  <img
                    alt=""
                    src={report.avatar}
                    className="mx-auto object-cover rounded-full h-16 w-16 "
                  />
                </a>
                <p className="text-gray-600">{report.name}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Test Name</h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className=" relative ">
                  <p className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    {report.title}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Patient info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.name}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Email: </label>
                    <input
                      type="email"
                      className="focus:outline-none"
                      defaultValue={report.email}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Image: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.avatar}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Blood Group: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.bloodGroup}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">District: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.district}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Upazila: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.upazila}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Test info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Test Name: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.title}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Test Description: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.shortDescription}
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Test Date: </label>
                    <input
                      type="text"
                      className="focus:outline-none"
                      defaultValue={report.date}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">Report info</h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Submit Report: </label>
                    <input
                      type="text"
                      className="input input-bordered w-3/5 "
                      placeholder="Submit Report (PDF) link"
                      {...register("reportLink", { required: true })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className=" relative ">
                    <label htmlFor="">Report Status: </label>
                    <select
                      className="select select-bordered w-3/5"
                      defaultValue="delivered"
                      {...register("report", { required: true })}
                    >
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                className="btn bg-colorPrimary hover:bg-black text-white px-20"
              >
                Delivered
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MakeReport;
