import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllTestsPage from "../Pages/AllTestsPage/AllTestsPage";
//import SignUp from './../Pages/SignUp/SignUp';
import TestDetails from "./../components/TestDetails/TestDetails";
import Dashboard from "./../Layout/Dashboard";
import AddTest from "./../Pages/Dashboard/AddTest";
import AllUsers from "../Pages/Dashboard/AllUsers";
import AllTests from "./../Pages/Dashboard/AllTests";
import Reservation from "./../Pages/Dashboard/Reservation";
import AddBanner from "./../Pages/Dashboard/AddBanner";
import AllBanner from "./../Pages/Dashboard/AllBanner";
import Statistics from "./../Pages/Dashboard/Statistics";
import UpdateBanner from "./../Pages/Dashboard/UpdateBanner";
import Profile from '../Pages/Dashboard/Profile';
import MyAppointments from './../Pages/Dashboard/MyAppointments';
import TestResult from './../Pages/Dashboard/TestResult';
import PrivateRoute from "./PrivateRoute";
import AdminRoute from './AdminRoute';
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import TestUpdate from "../Pages/Dashboard/TestUpdate";
import MakeReport from "../Pages/Dashboard/MakeReport";
import About from "../Pages/About/About";
import Doctors from "../Pages/Doctors/Doctors";
import Contact from "../Pages/Contact/Contact";
import Error404 from "../Pages/Error404/Error404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error404></Error404>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/allTests",
        element: <AllTestsPage></AllTestsPage>,
      },
      {
        path: "/allTests/:id",
        element: <PrivateRoute><TestDetails></TestDetails></PrivateRoute>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/doctors",
        element: <Doctors></Doctors> ,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
        
      },
      {
        path: "/dashboard/user/:_id",
        element: <UpdateProfile></UpdateProfile>,
        
      },
      // Admin dashboard
      {
        path: "/dashboard/allUsers",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute> ,
        loader: () =>
          fetch(`https://diagno-care-server-site.vercel.app/appointments`),
      },
      {
        path: "/dashboard/addTest",
        element: <AdminRoute><AddTest></AddTest></AdminRoute> ,
      },
      {
        path: "/dashboard/allTests",
        element: <AdminRoute><AllTests></AllTests></AdminRoute> ,
      },
      {
        path: "/dashboard/allTests/:_id",
        element: <AdminRoute><TestUpdate></TestUpdate></AdminRoute> ,
        loader: ({ params }) =>
          fetch(`https://diagno-care-server-site.vercel.app/allTests/${params._id}`),
      },
      {
        path: "/dashboard/reservation",
        element: <AdminRoute><Reservation></Reservation></AdminRoute> ,
      },
      {
        path: "/dashboard/reservation/:_id",
        element: <AdminRoute><MakeReport></MakeReport></AdminRoute> ,
        loader: ({ params }) =>
          fetch(`https://diagno-care-server-site.vercel.app/appointments/${params._id}`),
      },
      {
        path: "/dashboard/addBanner",
        element: <AdminRoute><AddBanner></AddBanner></AdminRoute> ,
      },
      {
        path: "/dashboard/allBanner",
        element: <AdminRoute><AllBanner></AllBanner></AdminRoute> ,
      },
      {
        path: "/dashboard/banner/:_id",
        element: <UpdateBanner></UpdateBanner>,
        loader: ({ params }) =>
          fetch(`https://diagno-care-server-site.vercel.app/banner/${params._id}`),
      },
      {
        path: "/dashboard/statistics",
        element: <Statistics></Statistics>,
      },
      // user dashboard
      
      {
        path: "/dashboard/myAppointments",
        element: <MyAppointments></MyAppointments>,
      },
      {
        path: "/dashboard/testResult",
        element: <TestResult></TestResult>,
      },
    ],
  },
]);
