import { FaChartPie, FaHome, FaList, FaUser, FaUsers } from "react-icons/fa";
import { GiHamburgerMenu, GiKnightBanner } from "react-icons/gi";
import { GrDocumentTest, GrTest } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { RiAddLargeFill } from "react-icons/ri";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { IoIosPaper, IoMdClose } from "react-icons/io";
import { Toaster } from "react-hot-toast";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isBlock] = useUser()

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex">
    {/* dashboard side bar */}
    <div className={`w-64 min-h-screen bg-colorPrimary text-white ${sidebarOpen ? 'block transition-all duration-300' : 'hidden transition-all duration-300'} lg:block`}>
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
            {isBlock ? (
              // eslint-disable-next-line react/no-unescaped-entities
              <h1 className="text-4xl">You're Blocked by admin</h1>
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
          </>
        )}

        {/* shared nav links */}
        <div className="divider"></div>
        <li>
          <NavLink to="/">
            <FaHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/allTests">
            <FaList />
            All Tests List
          </NavLink>
        </li>
      </ul>
    </div>
    {/* dashboard content */}
    <div className="flex-1 p-8 items-end justify-end w-full">
      {/* <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 bg-colorPrimary text-white rounded-md focus:outline-none"
      >
        {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
      </button> */}
      <label className="btn btn-circle swap swap-rotate lg:hidden">
  
  {/* this hidden checkbox controls the state */}
  <input type="checkbox"  onClick={toggleSidebar}/>
  {sidebarOpen ? (<><IoMdClose /></>) : (<><GiHamburgerMenu /></>)}
  
</label>
      <Outlet />
      <Toaster />
    </div>
  </div>

  );
};

export default Dashboard;
