import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/logo.png";
import useAuth from "./../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
  const { logout, user } = useAuth();
  const isAdmin = useAdmin();

  console.log(isAdmin);

  const handleLogOut = () => {
    //document.cookie = "token"+'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    logout();
  };
  //console.log(user);
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allTests"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
        >
          ALL TESTS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
        >
          ABOUT US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
        >
          DOCTORS
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
        >
          CONTACT US
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink 
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "text-colorPrimary font-bold border border-colorPrimary mr-3 scale-105 rounded-full"
              : "font-bold mr-3 "
          }
          >DASHBOARD</NavLink>
        </li>
      )}
    </>
  );

  return (
    <>
      <div className="">
        
        <div className="navbar fixed z-[99]  bg-gray-100 bg-opacity-20 backdrop-filter backdrop-blur-sm px-16">
          <div className="navbar-start">
            <div className="dropdown z-[99]">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navOptions}
              </ul>
            </div>

            <Link to="/" className="">
              <img className="md:h-[100px] h-[50px]"  src={logo} alt="" />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navOptions}</ul>
          </div>
          <div className="navbar-end">
            {/*user singed in information */}
            {user ? (
              <div
                className="dropdown dropdown-end tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"
                      }
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 z-[99] px-2 py-10 shadow-4xl shadow bg-black rounded-box w-64 border   "
                >
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co/vY5bFQR/2151033973-min.jpg"
                    }
                    alt=""
                    className="w-32 h-32 mx-auto rounded-full  aspect-square mb-6"
                  />
                  <li>
                    <p className=" btn mb-3">
                      <span>{user?.displayName || "user name not found"}</span>
                    </p>
                  </li>
                  <li>
                    <span className="btn mb-3">
                      {user?.email || "email not found"}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm btn-error text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn-sm md:btn md:px-8 rounded-3xl bg-[#0767a7] text-white border-0 hover:bg-black">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
