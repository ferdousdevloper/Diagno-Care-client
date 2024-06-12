import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { Helmet } from "react-helmet";
// import useAxiosPublic from "../../hooks/useAxiosPublic";

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  // const axiosPublic = useAxiosPublic();
  const { createUser, logout, updateUserProfile, setLoading, loading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const [showPassword, setShowPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePassword = (value) => {
    // Regular expressions to check for at least one uppercase letter and at least one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (value.length < 6) {
      return "Password must be at least 6 characters long";
    }

    if (!uppercaseRegex.test(value)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!lowercaseRegex.test(value)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!specialCharRegex.test(value)) {
      return "Password must contain at least one special character";
    }
    if (!numberRegex.test(value)) {
      return "Password must contain at least one digit";
    }

    return true; // Password is valid
  };

  const onSubmit = async (data) => {
    const { email, password, name, status, bloodGroup, district, upazila} = data;
       
    const imageFile = data.image[0]
    const formData = new FormData()
    formData.append('image', imageFile)
    
    try {
      setLoading(true)
      const { data  } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      )
      console.log(data.data.display_url)
      const avatar = data.data.display_url
      const result = await createUser(email, password);

      await updateUserProfile(name, data.data.display_url);

      /*
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      {
        email: result?.user?.email,
      },
      { withCredentials: true }
    )
    */
      console.log(data);
      navigate(from, { replace: true });
      toast
        .success("Signup Successful")

        const user = { email, avatar, name, status, bloodGroup, district, upazila};
        fetch('https://diagno-care-server-site.vercel.app/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
        })
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

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
    "Sylhet"
  ]
  const upazilas = [
    "Bagerhat Sadar", "Chitalmari", "Fakirhat", "Kachua", "Mollahat", "Mongla", "Morrelganj", "Rampal", "Sarankhola",
    "Bandarban Sadar", "Thanchi", "Lama", "Ruma", "Rowangchhari", "Naikhongchhari", "Ali Kadam",
    "Barguna Sadar", "Amtali", "Bamna", "Betagi", "Patharghata", "Taltali",
    "Barisal Sadar", "Bakerganj", "Babuganj", "Banaripara", "Gournadi", "Agailjhara", "Mehendiganj", "Muladi", "Hizla", "Wazirpur",
    "Bhola Sadar", "Borhanuddin", "Char Fasson", "Daulatkhan", "Lalmohan", "Manpura", "Tazumuddin",
    "Brahmanbaria Sadar", "Ashuganj", "Nabinagar", "Bancharampur", "Kasba", "Sarail", "Nasirnagar", "Akhaura", "Bijoynagar",
    "Chandpur Sadar", "Faridganj", "Haimchar", "Haziganj", "Kachua", "Matlab Uttar", "Matlab Dakkhin", "Shahrasti",
    "Chittagong Sadar", "Anwara", "Banshkhali", "Boalkhali", "Chandanaish", "Fatikchhari", "Hathazari", "Lohagara", "Mirsharai", "Patiya", "Rangunia", "Raozan", "Sandwip", "Satkania", "Sitakunda",
    "Chuadanga Sadar", "Alamdanga", "Damurhuda", "Jibannagar",
    "Comilla Sadar", "Barura", "Brahmanpara", "Burichong", "Chandina", "Chauddagram", "Daudkandi", "Debidwar", "Homna", "Laksam", "Muradnagar", "Meghna", "Monohorgonj", "Nangalkot", "Titas",
    "Cox's Bazar Sadar", "Chakaria", "Kutubdia", "Maheshkhali", "Ramu", "Teknaf", "Ukhia", "Pekua",
    "Dhaka Sadar", "Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar",
    "Dinajpur Sadar", "Birampur", "Birganj", "Biral", "Bochaganj", "Chirirbandar", "Phulbari", "Ghoraghat", "Hakimpur", "Kaharole", "Khansama", "Nawabganj", "Parbatipur",
    "Faridpur Sadar", "Alfadanga", "Bhanga", "Boalmari", "Charbhadrasan", "Madhukhali", "Nagarkanda", "Sadarpur", "Shaltha",
    "Feni Sadar", "Chhagalnaiya", "Daganbhuiyan", "Parshuram", "Fulgazi", "Sonagazi",
    "Gaibandha Sadar", "Fulchhari", "Gobindaganj", "Palashbari", "Sadullapur", "Sughatta", "Sundarganj",
    "Gazipur Sadar", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj",
    "Gopalganj Sadar", "Kashiani", "Kotalipara", "Muksudpur", "Tungipara",
    "Habiganj Sadar", "Ajmiriganj", "Baniachong", "Bahubal", "Chunarughat", "Lakhai", "Madhabpur", "Nabiganj",
    "Jamalpur Sadar", "Bakshiganj", "Dewanganj", "Islampur", "Madarganj", "Melandaha", "Sarishabari",
    "Jashore Sadar", "Abhaynagar", "Bagherpara", "Chaugachha", "Jhikargachha", "Keshabpur", "Manirampur", "Sharsha",
    "Jhalokati Sadar", "Kathalia", "Nalchity", "Rajapur",
    "Jhenaidah Sadar", "Harinakunda", "Kaliganj", "Kotchandpur", "Maheshpur", "Shailkupa",
    "Joypurhat Sadar", "Akkelpur", "Kalai", "Khetlal", "Panchbibi",
    "Khagrachari Sadar", "Dighinala", "Lakshmichhari", "Mahalchhari", "Manikchhari", "Matiranga", "Panchhari", "Ramgarh",
    "Khulna Sadar", "Batiaghata", "Dacope", "Dumuria", "Dighalia", "Koyra", "Paikgachha", "Phultala", "Rupsa", "Terokhada",
    "Kushtia Sadar", "Bheramara", "Daulatpur", "Khoksa", "Kumarkhali", "Mirpur",
    "Lakshmipur Sadar", "Raipur", "Ramganj", "Ramgati", "Komolnagar",
    "Lalmonirhat Sadar", "Aditmari", "Hatibandha", "Kaliganj", "Patgram",
    "Madaripur Sadar", "Kalkini", "Rajoir", "Shibchar",
    "Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur",
    "Manikganj Sadar", "Daulatpur", "Ghior", "Harirampur", "Saturia", "Shibalaya", "Singair",
    "Meherpur Sadar", "Gangni", "Mujibnagar",
    "Moulvibazar Sadar", "Barlekha", "Juri", "Kamalganj", "Kulaura", "Rajnagar", "Sreemangal",
    "Munshiganj Sadar", "Gazaria", "Lohajang", "Sirajdikhan", "Sreenagar", "Tongibari",
    "Mymensingh Sadar", "Bhaluka", "Dhobaura", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal",
    "Naogaon Sadar", "Atrai", "Badalgachhi", "Manda", "Dhamoirhat", "Mohadevpur", "Niamatpur", "Patnitala", "Porsha", "Raninagar", "Sapahar",
    "Narail Sadar", "Kalia", "Lohagara",
    "Narayanganj Sadar", "Araihazar", "Bandar", "Rupganj", "Sonargaon",
    "Narsingdi Sadar", "Belabo", "Monohardi", "Palash", "Raipura", "Shibpur",
    "Natore Sadar", "Bagatipara", "Baraigram", "Gurudaspur", "Lalpur", "Singra",
    "Netrokona Sadar", "Atpara", "Barhatta", "Durgapur", "Kalmakanda", "Kendua", "Khaliajuri", "Madan", "Mohanganj", "Purbadhala",
    "Nilphamari Sadar", "Dimla", "Domar", "Jaldhaka", "Kishoreganj", "Saidpur",
    "Noakhali Sadar", "Begumganj", "Chatkhil", "Companiganj", "Hatiya", "Senbagh", "Sonaimuri", "Suborno Char",
    "Pabna Sadar", "Atgharia", "Bera", "Bhangura", "Chatmohar", "Faridpur", "Ishwardi", "Santhia", "Sujanagar",
    "Panchagarh Sadar", "Atwari", "Boda", "Debiganj", "Tetulia",
    "Patuakhali Sadar", "Bauphal", "Dashmina", "Galachipa", "Kalapara", "Mirzaganj", "Rangabali", "Dumki",
    "Pirojpur Sadar", "Bhandaria", "Kawkhali", "Mathbaria", "Nazirpur", "Nesarabad (Swarupkathi)", "Zianagar (Indurkani)",
    "Rajbari Sadar", "Baliakandi", "Goalandaghat", "Pangsha", "Kalukhali",
    "Rajshahi Sadar", "Bagha", "Bagmara", "Charghat", "Durgapur", "Godagari", "Mohanpur", "Paba", "Puthia", "Tanore",
    "Rangamati Sadar", "Belaichhari", "Bagaichhari", "Barkal", "Kaptai", "Juraichhari", "Langadu", "Naniarchar", "Rajasthali",
    "Rangpur Sadar", "Badarganj", "Gangachhara", "Kaunia", "Mithapukur", "Pirgachha", "Pirganj", "Taraganj",
    "Satkhira Sadar", "Assasuni", "Debhata", "Kalaroa", "Kaliganj", "Shyamnagar", "Tala",
    "Shariatpur Sadar", "Bhedarganj", "Damudya", "Gosairhat", "Naria", "Zajira",
    "Sherpur Sadar", "Jhenaigati", "Nakla", "Nalitabari", "Sreebardi",
    "Sirajganj Sadar", "Belkuchi", "Chauhali", "Kamarkhanda", "Kazipur", "Raiganj", "Shahjadpur", "Tarash", "Ullahpara",
    "Sunamganj Sadar", "Bishwamvarpur", "Chhatak", "Dakshin Sunamganj", "Derai", "Dharampasha", "Dowarabazar", "Jagannathpur", "Jamalganj", "Sullah", "Tahirpur",
    "Sylhet Sadar", "Bishwanath", "Companiganj", "Fenchuganj", "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Zakiganj", "South Surma",
    "Tangail Sadar", "Basail", "Bhuapur", "Delduar", "Dhanbari", "Gopalpur", "Ghatail", "Kalihati", "Madhupur", "Mirzapur", "Nagarpur", "Sakhipur",
    "Thakurgaon Sadar", "Baliadangi", "Haripur", "Pirganj", "Ranisankail"
  ];
  

  return (
    <div>
      <Helmet>
        <title>Diagno Care | Sign Up</title>
      </Helmet>
      <h1 className="text-5xl font-bold text-center pt-32 ">
        Register now!
      </h1>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl inset-0 bg-blue-gray-200 bg-opacity-25 backdrop-filter backdrop-blur-md dark:bg-gray-50 dark:bg-opacity-25 dark:backdrop-blur-md rounded-xl border">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="name"
                  name="name"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              {/*
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                
                <input
                  type="text"
                  placeholder="Image URL"
                  className="input input-bordered"
                  required
                  {...register("image", { required: true })}
                />
                {errors.name && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <input
                  type="text"
                  name="status"
                  placeholder="Status"
                  defaultValue="active"
                  readOnly
                  className="input input-bordered"
                  required
                  {...register("status")}
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                
                <input type="file" 
                name="image"
                {...register("image")}
                className="file-input file-input-bordered bg-colorPrimary text-white w-full max-w-xs" />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="bloodGroup"
                  type="bloodGroup"
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
                {errors.name && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <div className="flex gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">District</span>
                  </label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    type="district"
                    name="district"
                    required
                    {...register("district", { required: true })}
                  >
                    <option disabled selected>
                      District?
                    </option>
                    {
                      districts.map((district) => (<option key={district.idx}>{district}</option>))
                    }
                  </select>
                  {errors.name && (
                    <span className="text-error">This field is required</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Upazila</span>
                  </label>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    type="upazila"
                    name="upazila"
                    required
                    {...register("upazila", { required: true })}
                  >
                    <option disabled selected>
                      Upazila?
                    </option>
                    {
                      upazilas.map((upazila) => (<option key={upazila.idx}>{upazila}</option>))
                    }
                  </select>
                  {errors.name && (
                    <span className="text-error">This field is required</span>
                  )}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-error">This field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    required
                    {...register("password", {
                      required: true,
                      validate: validatePassword, // Custom validation function
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 my-4 text-right"
                  >
                    {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
                  </span>
                </div>

                {errors.password && (
                  <span className="text-error">{errors.password.message}</span>
                )}
              </div>
             { /*
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                    required
                    {...register("confirmPassword", {
                      required: true,
                       // Custom validation function
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 my-4 text-right"
                  >
                    {showPassword ? <FiEye></FiEye> : <FiEyeOff></FiEyeOff>}
                  </span>
                </div>

                {errors.confirmPassword && (
                  <span className="text-error">{errors.confirmPassword.message}</span>
                )}
              </div>
              */}
              <div className="form-control mt-6">
                <button className="btn bg-blue-500 text-white border-0">
                  Register
                </button>
              </div>
              <div className="mt-8">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    <strong>Sign In</strong>
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
