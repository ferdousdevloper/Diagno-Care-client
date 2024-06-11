//import { useParams } from "react-router-dom";
 import Loader from "../../components/Loader/Loader";
 import useAuth from "../../hooks/useAuth";
 //import useAxiosPublic from "../../hooks/useAxiosPublic";
 import { useQuery } from "@tanstack/react-query";
 //import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
//import useAuth from "../../hooks/useAuth";



const Profile = () => {
  const {user, loading} = useAuth();

       //const { email } = useParams();
    //const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  console.log(userInfo);

  return (
    <div>
      <section className="">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <h1 className="mt-2 text-2xl font-semibold capitalize lg:text-3xl text-colorPrimary ">
            My Profile
          </h1>

          <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
            <div className="absolute w-full bg-colorPrimary -z-10 md:h-96 rounded-2xl"></div>

            <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={userInfo?.avatar}
                alt="client photo"
              />

              <div className="mt-2 md:mx-6">
                <div>
                  <p className="text-xl font-medium tracking-tight text-white">{userInfo?.name}</p>
                  <p className="text-blue-200 ">Email: {userInfo?.email}</p>
                </div>

                <p className="mt-4 text-lg leading-relaxed text-white">
                  Blood Group: ({userInfo?.bloodGroup})
                </p>
                <p className="text-blue-200 ">Address: {userInfo?.district}, {userInfo?.upazila}.</p>

                <Link to={`/dashboard/user/${userInfo?._id}`}>
                <button className="btn my-6 bg-[#2c8ac9] text-white hover:bg-black">Update Profile</button>
                </Link>

              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default Profile;
