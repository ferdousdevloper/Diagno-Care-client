import { FaChartPie, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { GrDocumentTest, GrTest } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { IoIosPaper } from "react-icons/io";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-colorPrimary text-white">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/profile">
              <FaUser />
              Profile
            </NavLink>
          </li>
          {isAdmin ? (
            <>
              <li>
                <Link to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </Link>
              </li>
              <li>
                <NavLink to="/dashboard/addTest">
                  <RiAddLargeFill />
                  Add a test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allTests">
                  <GrDocumentTest />
                  All tests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <IoBookmarks />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addBanner">
                  <RiAddLargeFill />
                  Add banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allBanner">
                  <GiKnightBanner />
                  All banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/Statistics">
                  <FaChartPie />
                  Statistics
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myAppointments">
                  <IoIosPaper />
                  Upcoming Appointments
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/testResult">
                  <GrTest />
                  Test Result
                </NavLink>
              </li>
            </>
          )}

          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/allTests">
              <FaList></FaList>
              All Tests List
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
