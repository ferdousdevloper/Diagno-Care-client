import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const BookNow = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: tests = {}, isLoading } = useQuery({
    queryKey: ["tests", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/allTests/${id}`);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  console.log(tests);
  return (
    <div className="container mx-auto py-40">
      <h1 className="text-6xl fontBebas font-extrabold text-center">
        TEST APPOINTMENT
      </h1>
      <div className="hero py-20 px-20 bg-base-200">
          <div className="flex flex-col lg:flex-row-reverse gap-10">
            <div>
              <img src={tests.image} className="rounded-lg shadow-2xl" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">{tests.title}</h1>
              <p className="py-6">{tests.shortDescription}</p>
              <p>Date: {tests.date}</p>
              <p className="py-6">Available slots: {tests.slots}</p>
              {/* <Link to={`/bookNow/${tests._id}`}><button className="btn btn-primary">Book Now</button></Link> */}
              
            </div>
          </div>
        </div>
    </div>
  );
};

export default BookNow;
