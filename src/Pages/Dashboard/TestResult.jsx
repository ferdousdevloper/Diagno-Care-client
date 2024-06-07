//import useTestReport from "../../hooks/useTestReport";

import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TestResult = () => {
    const {user} = useAuth()
    const [item, setItem] = useState([]);
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
    
        getData();
      }, [user]);
    
      const getData = async () => {
        const { data } = await axiosSecure(
          `/appointment/${user?.email}`,
          
        );
        const filterData = data.filter(item => item.report === "delivered")
        setItem(filterData);
      };

      console.log(item);
    

    return (
        <div>
            <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Test Name</th>
              <th>Your Information</th>
              <th>Test Delivery Status</th>
              <th>Report View</th>
            </tr>
          </thead>
          <tbody>
            {item.map((i, index) => (
              <tr key={i._id} className="border-b border-2">
                <th>{index + 1}</th>
                <td className="text-3xl font-bold">{i.title}</td>
                <td>
                  <div>
                    <p> <strong>Name:</strong> {i.name}</p>
                    <p><strong>Email:</strong> {i.email}</p>
                    <p><strong>Blood Group:</strong> {i.bloodGroup}</p>
                    <p><strong>Address:</strong> {i.district}, {i.upazila}</p>
                  </div>
                </td>
                <td><p className="border btn bg-green-500 text-white font-bold text-base">Delivered</p></td>
                <td><button className="btn bg-colorPrimary text-white text-base hover:bg-black"><a href={i.reportLink}>View Report</a></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default TestResult;