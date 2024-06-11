import { useQuery } from "@tanstack/react-query";
//import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const FeturedTest = () => {
  const axiosPublic = useAxiosPublic();

  const {  data: appointment = [] } = useQuery({
    queryKey: ["reserve"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/appointments`);
      return res.data;
    },
  });
  console.log(appointment);

  return (
    <div className="md:container md:mx-auto mx-10">
      <h1 className="text-xl md:text-6xl fontBebas font-extrabold text-center mt-20 mb-10">
        FEATURED TEST
      </h1>
      <hr className="my-10 border-2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {appointment.slice(0, 6).map((i) => (
        <div key={i._id}>
          <div className=" border-b-[10px] border-t-[10px] border-b-colorPrimary  border-t-colorPrimary rounded rounded-br-[100px] rounded-tl-[100px] w-full bg-base-100 shadow-xl">
            <figure>
              <img
                src={i.image}
                alt="Test Image"
                className="rounded-tl-[100px]"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title fontBebas text-base md:text-xl">Test: {i.title}</h2>
              <p className="text-sm md:text-base"><strong>Description: </strong>{i.shortDescription}</p>
              <p className="text-sm md:text-base"><strong>Date:</strong> {i.date}</p>
              <p className="text-sm text-lg"><strong>Price:</strong> <span className="font-extrabold text-base md:text-3xl">${i.price}</span></p>
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div> */}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default FeturedTest;
