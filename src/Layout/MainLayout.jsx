import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
//import Home from "../Pages/Home/Home";
import NavBar from "../Shared/NavBar/Navbar";
import { Toaster } from "react-hot-toast";


const MainLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="min-h-[calc(100vh-220px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Toaster></Toaster>
        </div>
    );
};

export default MainLayout;