import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";

const BookNow = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
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
      <div className="hero bg-transparent py-20 px-20 bg-base-200">
        <div className="flex flex-col lg:flex-row-reverse gap-10">
          <div>
            <img src={tests.image} className="rounded-lg shadow-2xl" />
          </div>
          <div>
            <div className="form-control w-full my-6">
              <input
                type="text"
                defaultValue={tests.title}
                readOnly
                {...register("title", { required: true })}
                required
                className="w-full text-5xl font-bold focus:outline-none"
              />
            </div>
            <div className="form-control w-full my-6">
              <input
                type="text"
                defaultValue={tests.shortDescription}
                readOnly
                {...register("shortDescription", { required: true })}
                required
                className="w-full focus:outline-none"
              />
            </div>
            <div className="form-control w-full my-6">
              <input
                type="text"
                defaultValue={tests.date}
                readOnly
                {...register("date", { required: true })}
                required
                className="w-full focus:outline-none"
              />
            </div>
            {/* <Link to={`/bookNow/${tests._id}`}><button className="btn btn-primary">Book Now</button></Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
