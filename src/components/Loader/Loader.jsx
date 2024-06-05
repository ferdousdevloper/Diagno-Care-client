import { ClipLoader } from "react-spinners";



const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center pt-40 md:pt-20 min-h-[calc(100vh-136px)]">
            <ClipLoader size={100} speedMultiplier={2} color="#86efac" />
        </div>
    );
};

export default Loader;