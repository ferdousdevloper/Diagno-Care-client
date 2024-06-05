//import { useLoaderData } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader/Loader";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  //const userInfo = useLoaderData()
  // console.log(userInfo);
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const { user, loading } = useAuth();

  //const { email } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {}, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  console.log(userInfo);

  const onSubmit = async (data) =>{

    const currentUserItem = {
        name: data.name,
        bloodGroup: data.bloodGroup,
       // coupon_code: data.coupon_code,
        district: data.district,
        upazila: data.upazila,
        // image: data.image,

    }
    // 
    const currentUser = await axiosSecure.patch(`/users/${user?.email}`, currentUserItem);
    console.log(currentUser.data)
    if(currentUser.data.modifiedCount > 0){
        // show success popup
        // reset();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${data.name} is updated to the menu.`,
            showConfirmButton: false,
            timer: 1500
          });
          
          navigate("/dashboard/profile")
          
    }
    console.log( 'updated data', data);
}

  const districts = [
    "Barguna",
    "Barisal",
    "Bhola",
    "Jhalokathi",
    "Patuakhali",
    "Pirojpur",
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cumilla",
    "Cox's Bazar",
    "Feni",
    "Khagrachari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
    "Jamalpur",
    "Mymensingh",
    "Netrokona",
    "Sherpur",
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Chapainawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
    "Habiganj",
    "Moulvibazar",
    "Sunamganj",
    "Sylhet",
  ];
  const upazilas = [
    "Bagerhat Sadar",
    "Chitalmari",
    "Fakirhat",
    "Kachua",
    "Mollahat",
    "Mongla",
    "Morrelganj",
    "Rampal",
    "Sarankhola",
    "Bandarban Sadar",
    "Thanchi",
    "Lama",
    "Ruma",
    "Rowangchhari",
    "Naikhongchhari",
    "Ali Kadam",
    "Barguna Sadar",
    "Amtali",
    "Bamna",
    "Betagi",
    "Patharghata",
    "Taltali",
    "Barisal Sadar",
    "Bakerganj",
    "Babuganj",
    "Banaripara",
    "Gournadi",
    "Agailjhara",
    "Mehendiganj",
    "Muladi",
    "Hizla",
    "Wazirpur",
    "Bhola Sadar",
    "Borhanuddin",
    "Char Fasson",
    "Daulatkhan",
    "Lalmohan",
    "Manpura",
    "Tazumuddin",
    "Brahmanbaria Sadar",
    "Ashuganj",
    "Nabinagar",
    "Bancharampur",
    "Kasba",
    "Sarail",
    "Nasirnagar",
    "Akhaura",
    "Bijoynagar",
    "Chandpur Sadar",
    "Faridganj",
    "Haimchar",
    "Haziganj",
    "Kachua",
    "Matlab Uttar",
    "Matlab Dakkhin",
    "Shahrasti",
    "Chittagong Sadar",
    "Anwara",
    "Banshkhali",
    "Boalkhali",
    "Chandanaish",
    "Fatikchhari",
    "Hathazari",
    "Lohagara",
    "Mirsharai",
    "Patiya",
    "Rangunia",
    "Raozan",
    "Sandwip",
    "Satkania",
    "Sitakunda",
    "Chuadanga Sadar",
    "Alamdanga",
    "Damurhuda",
    "Jibannagar",
    "Comilla Sadar",
    "Barura",
    "Brahmanpara",
    "Burichong",
    "Chandina",
    "Chauddagram",
    "Daudkandi",
    "Debidwar",
    "Homna",
    "Laksam",
    "Muradnagar",
    "Meghna",
    "Monohorgonj",
    "Nangalkot",
    "Titas",
    "Cox's Bazar Sadar",
    "Chakaria",
    "Kutubdia",
    "Maheshkhali",
    "Ramu",
    "Teknaf",
    "Ukhia",
    "Pekua",
    "Dhaka Sadar",
    "Dhamrai",
    "Dohar",
    "Keraniganj",
    "Nawabganj",
    "Savar",
    "Dinajpur Sadar",
    "Birampur",
    "Birganj",
    "Biral",
    "Bochaganj",
    "Chirirbandar",
    "Phulbari",
    "Ghoraghat",
    "Hakimpur",
    "Kaharole",
    "Khansama",
    "Nawabganj",
    "Parbatipur",
    "Faridpur Sadar",
    "Alfadanga",
    "Bhanga",
    "Boalmari",
    "Charbhadrasan",
    "Madhukhali",
    "Nagarkanda",
    "Sadarpur",
    "Shaltha",
    "Feni Sadar",
    "Chhagalnaiya",
    "Daganbhuiyan",
    "Parshuram",
    "Fulgazi",
    "Sonagazi",
    "Gaibandha Sadar",
    "Fulchhari",
    "Gobindaganj",
    "Palashbari",
    "Sadullapur",
    "Sughatta",
    "Sundarganj",
    "Gazipur Sadar",
    "Kaliakair",
    "Kapasia",
    "Sreepur",
    "Kaliganj",
    "Gopalganj Sadar",
    "Kashiani",
    "Kotalipara",
    "Muksudpur",
    "Tungipara",
    "Habiganj Sadar",
    "Ajmiriganj",
    "Baniachong",
    "Bahubal",
    "Chunarughat",
    "Lakhai",
    "Madhabpur",
    "Nabiganj",
    "Jamalpur Sadar",
    "Bakshiganj",
    "Dewanganj",
    "Islampur",
    "Madarganj",
    "Melandaha",
    "Sarishabari",
    "Jashore Sadar",
    "Abhaynagar",
    "Bagherpara",
    "Chaugachha",
    "Jhikargachha",
    "Keshabpur",
    "Manirampur",
    "Sharsha",
    "Jhalokati Sadar",
    "Kathalia",
    "Nalchity",
    "Rajapur",
    "Jhenaidah Sadar",
    "Harinakunda",
    "Kaliganj",
    "Kotchandpur",
    "Maheshpur",
    "Shailkupa",
    "Joypurhat Sadar",
    "Akkelpur",
    "Kalai",
    "Khetlal",
    "Panchbibi",
    "Khagrachari Sadar",
    "Dighinala",
    "Lakshmichhari",
    "Mahalchhari",
    "Manikchhari",
    "Matiranga",
    "Panchhari",
    "Ramgarh",
    "Khulna Sadar",
    "Batiaghata",
    "Dacope",
    "Dumuria",
    "Dighalia",
    "Koyra",
    "Paikgachha",
    "Phultala",
    "Rupsa",
    "Terokhada",
    "Kushtia Sadar",
    "Bheramara",
    "Daulatpur",
    "Khoksa",
    "Kumarkhali",
    "Mirpur",
    "Lakshmipur Sadar",
    "Raipur",
    "Ramganj",
    "Ramgati",
    "Komolnagar",
    "Lalmonirhat Sadar",
    "Aditmari",
    "Hatibandha",
    "Kaliganj",
    "Patgram",
    "Madaripur Sadar",
    "Kalkini",
    "Rajoir",
    "Shibchar",
    "Magura Sadar",
    "Mohammadpur",
    "Shalikha",
    "Sreepur",
    "Manikganj Sadar",
    "Daulatpur",
    "Ghior",
    "Harirampur",
    "Saturia",
    "Shibalaya",
    "Singair",
    "Meherpur Sadar",
    "Gangni",
    "Mujibnagar",
    "Moulvibazar Sadar",
    "Barlekha",
    "Juri",
    "Kamalganj",
    "Kulaura",
    "Rajnagar",
    "Sreemangal",
    "Munshiganj Sadar",
    "Gazaria",
    "Lohajang",
    "Sirajdikhan",
    "Sreenagar",
    "Tongibari",
    "Mymensingh Sadar",
    "Bhaluka",
    "Dhobaura",
    "Fulbaria",
    "Gaffargaon",
    "Gauripur",
    "Haluaghat",
    "Ishwarganj",
    "Muktagachha",
    "Nandail",
    "Phulpur",
    "Trishal",
    "Naogaon Sadar",
    "Atrai",
    "Badalgachhi",
    "Manda",
    "Dhamoirhat",
    "Mohadevpur",
    "Niamatpur",
    "Patnitala",
    "Porsha",
    "Raninagar",
    "Sapahar",
    "Narail Sadar",
    "Kalia",
    "Lohagara",
    "Narayanganj Sadar",
    "Araihazar",
    "Bandar",
    "Rupganj",
    "Sonargaon",
    "Narsingdi Sadar",
    "Belabo",
    "Monohardi",
    "Palash",
    "Raipura",
    "Shibpur",
    "Natore Sadar",
    "Bagatipara",
    "Baraigram",
    "Gurudaspur",
    "Lalpur",
    "Singra",
    "Netrokona Sadar",
    "Atpara",
    "Barhatta",
    "Durgapur",
    "Kalmakanda",
    "Kendua",
    "Khaliajuri",
    "Madan",
    "Mohanganj",
    "Purbadhala",
    "Nilphamari Sadar",
    "Dimla",
    "Domar",
    "Jaldhaka",
    "Kishoreganj",
    "Saidpur",
    "Noakhali Sadar",
    "Begumganj",
    "Chatkhil",
    "Companiganj",
    "Hatiya",
    "Senbagh",
    "Sonaimuri",
    "Suborno Char",
    "Pabna Sadar",
    "Atgharia",
    "Bera",
    "Bhangura",
    "Chatmohar",
    "Faridpur",
    "Ishwardi",
    "Santhia",
    "Sujanagar",
    "Panchagarh Sadar",
    "Atwari",
    "Boda",
    "Debiganj",
    "Tetulia",
    "Patuakhali Sadar",
    "Bauphal",
    "Dashmina",
    "Galachipa",
    "Kalapara",
    "Mirzaganj",
    "Rangabali",
    "Dumki",
    "Pirojpur Sadar",
    "Bhandaria",
    "Kawkhali",
    "Mathbaria",
    "Nazirpur",
    "Nesarabad (Swarupkathi)",
    "Zianagar (Indurkani)",
    "Rajbari Sadar",
    "Baliakandi",
    "Goalandaghat",
    "Pangsha",
    "Kalukhali",
    "Rajshahi Sadar",
    "Bagha",
    "Bagmara",
    "Charghat",
    "Durgapur",
    "Godagari",
    "Mohanpur",
    "Paba",
    "Puthia",
    "Tanore",
    "Rangamati Sadar",
    "Belaichhari",
    "Bagaichhari",
    "Barkal",
    "Kaptai",
    "Juraichhari",
    "Langadu",
    "Naniarchar",
    "Rajasthali",
    "Rangpur Sadar",
    "Badarganj",
    "Gangachhara",
    "Kaunia",
    "Mithapukur",
    "Pirgachha",
    "Pirganj",
    "Taraganj",
    "Satkhira Sadar",
    "Assasuni",
    "Debhata",
    "Kalaroa",
    "Kaliganj",
    "Shyamnagar",
    "Tala",
    "Shariatpur Sadar",
    "Bhedarganj",
    "Damudya",
    "Gosairhat",
    "Naria",
    "Zajira",
    "Sherpur Sadar",
    "Jhenaigati",
    "Nakla",
    "Nalitabari",
    "Sreebardi",
    "Sirajganj Sadar",
    "Belkuchi",
    "Chauhali",
    "Kamarkhanda",
    "Kazipur",
    "Raiganj",
    "Shahjadpur",
    "Tarash",
    "Ullahpara",
    "Sunamganj Sadar",
    "Bishwamvarpur",
    "Chhatak",
    "Dakshin Sunamganj",
    "Derai",
    "Dharampasha",
    "Dowarabazar",
    "Jagannathpur",
    "Jamalganj",
    "Sullah",
    "Tahirpur",
    "Sylhet Sadar",
    "Bishwanath",
    "Companiganj",
    "Fenchuganj",
    "Golapganj",
    "Gowainghat",
    "Jaintiapur",
    "Kanaighat",
    "Zakiganj",
    "South Surma",
    "Tangail Sadar",
    "Basail",
    "Bhuapur",
    "Delduar",
    "Dhanbari",
    "Gopalpur",
    "Ghatail",
    "Kalihati",
    "Madhupur",
    "Mirzapur",
    "Nagarpur",
    "Sakhipur",
    "Thakurgaon Sadar",
    "Baliadangi",
    "Haripur",
    "Pirganj",
    "Ranisankail",
  ];
  return (
    <div>
      <section className="">
        <div className="max-w-6xl px-6 py-10 mx-auto">
          <h1 className="mt-2 text-2xl font-semibold capitalize lg:text-3xl text-colorPrimary ">
            Update Profile
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <main className="relative z-20 w-full mt-8 md:flex md:items-center xl:mt-12">
              <div className="absolute w-full bg-colorPrimary -z-10 md:h-96 rounded-2xl"></div>

              <div className="w-full p-6 bg-blue-600 md:flex md:items-center rounded-2xl md:bg-transparent md:p-0 lg:px-12 md:justify-evenly">
              <img
                className="h-24 w-24 md:mx-6 rounded-full object-cover shadow-md md:h-[32rem] md:w-80 lg:h-[36rem] lg:w-[26rem] md:rounded-2xl"
                src={userInfo?.avatar}
                alt="client photo"
              />

                <div className="mt-2 md:mx-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-white">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={userInfo?.name}
                      className="input input-bordered"
                      required
                      {...register("name")}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="bloodGroup"
                      type="bloodGroup"
                      defaultValue={userInfo?.bloodGroup}
                      required
                      {...register("bloodGroup", { required: true })}
                    >
                      <option disabled selected>
                        Blood Group?
                      </option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">District</span>
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        type="district"
                        defaultValue={userInfo?.district}
                        name="district"
                        required
                        {...register("district", { required: true })}
                      >
                        <option disabled selected>
                          District?
                        </option>
                        {districts.map((district) => (
                          <option key={district.idx}>{district}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Upazila</span>
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        type="upazila"
                        defaultValue={userInfo?.upazila}
                        name="upazila"
                        required
                        {...register("upazila", { required: true })}
                      >
                        <option disabled selected>
                          Upazila?
                        </option>
                        {upazilas.map((upazila) => (
                          <option key={upazila.idx}>{upazila}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button className="btn my-6 bg-[#2c8ac9] text-white hover:bg-black">
                    Update Profile
                  </button>
                </div>
              </div>
            </main>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateProfile;
