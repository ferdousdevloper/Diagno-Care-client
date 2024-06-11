import { useQuery } from "@tanstack/react-query";
import useAllTest from "./../../hooks/useAllTest";
import useAxiosSecure from "../../hooks/useAxiosSecure";

//----------------------------------------------------------
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Statistics = () => {
  const [tests] = useAllTest();
  console.log(tests);

  const axiosSecure = useAxiosSecure();
  //const { register, handleSubmit } = useForm();

  const { refetch, data: appointment = [] } = useQuery({
    queryKey: ["reserve"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments`);
      return res.data;
    },
  });
  console.log(appointment);

  const pending = appointment.filter((item) => item.report === "pending");

  console.log(pending);

  const delivered = appointment.filter((item) => item.report === "delivered");
  console.log(delivered);


  // Calculate total for percentage calculation
  const totalTestsAppointments = tests.length + appointment.length;
  const totalReports = pending.length + delivered.length;

  //-----------------chart---------------------------
//#FFB533
const testAppointmentData = [
  { name: 'Tests', value: tests.length, percentage: ((tests.length / totalTestsAppointments) * 100).toFixed(2) },
  { name: 'Booked', value: appointment.length, percentage: ((appointment.length / totalTestsAppointments) * 100).toFixed(2) },
];

const reportStatusData = [
  { name: 'Pending', value: pending.length, percentage: ((pending.length / totalReports) * 100).toFixed(2) },
  { name: 'Delivered', value: delivered.length, percentage: ((delivered.length / totalReports) * 100).toFixed(2) },
];

// Colors for the pie charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Custom label function to show percentage
const renderCustomLabel = ({ name, percentage }) => `${name}: ${percentage}%`;


  return (
    <div>
      <h1 className="text-6xl fontBebas font-extrabold text-center mb-10">
        STATISTICS
      </h1>
      <hr />
      <div className="flex flex-col md:flex-row items-center justify-around">
        {/* Pie Chart for Tests and Appointments */}
        <div className="">
        <PieChart width={400} height={400}>
        <Pie
          data={testAppointmentData}
          cx={200}
          cy={200}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percentage }) => renderCustomLabel({ name, percentage })}
        >
          {testAppointmentData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, entry) => `${entry.payload.percentage}%`} />
        <Legend />
      </PieChart>
          <h1 className="mt-10 text-xl font-bold flex items-center justify-center">ALL TEST AND BOOKING RATIO</h1>
        </div>

        <div className="">
          {/* Pie Chart for Pending and Delivered Reports */}
          <PieChart width={400} height={400}>
        <Pie
          data={reportStatusData}
          cx={200}
          cy={200}
          outerRadius={100}
          fill="#82ca9d"
          dataKey="value"
          label={({ name, percentage }) => renderCustomLabel({ name, percentage })}
        >
          {reportStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, entry) => `${entry.payload.percentage}%`} />
        <Legend />
      </PieChart>
          <h1 className="mt-10 text-xl font-bold mt-10 text-xl font-bold flex items-center justify-center">ALL PENDING AND DELIVERY RATIO</h1>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
