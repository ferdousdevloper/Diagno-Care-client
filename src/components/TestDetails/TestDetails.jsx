import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";

const TestDetails = () => {
  const [isBlock] = useUser();

  //----------------------------------------------------------
  const [isBook, setIsBook] = useState(false)
  const [coupon, setCoupon] = useState('');
  const [message, setMessage] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState();
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  //-----------------------------------------------------------
  const { user, loading } = useAuth();
  const { register, handleSubmit, reset } = useForm();
const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });
  console.log(userInfo);

  const {
    data: tests = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tests", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/allTests/${id}`);
      return data;
    },
  });
  if (isLoading) return <Loader></Loader>;
  

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url

    // now send the menu item data to the server with the image url
    const bookNow = {
      title: data.title,
      shortDescription: data.shortDescription,
      date: data.date,
      report: data.report,
      slots: parseFloat(data.slots),
      price: parseFloat(data.price),
      name: data.name,
      avatar: data.avatar,
      email: data.email,
      bloodGroup: data.bloodGroup,
      district: data.district,
      upazila: data.upazila,
      //image: res.data.data.display_url,
    };

    const slotsCount = parseInt(tests.slots);
    const { _id } = tests;
    console.log(_id);

    console.log(slotsCount);

    if (slotsCount > 0) {
      console.log("Volunteering for:");
    } else {
      Swal.fire({
        title: "No available slots right now!!",
        icon: "error",
      });
      return;
    }
    //
    const bookNowRes = await axiosSecure.post("/appointments", bookNow);
    console.log(bookNowRes.data);
    if (bookNowRes.data.insertedId) {
      setIsBook(true)
      // show success popup
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.title} is booked for appointment`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log("with image url", data);
    const slotCount = await axiosSecure.patch(`/alltest/${_id}`, slotsCount);
    console.log(slotCount);
    refetch();

    //navigate("/allTests");
  };

  console.log(tests);

  //--------------------------------------
  //payment section added
  //===========================================

  //coupon part-------------------
  const defaultPrice =tests?.price

  const validCoupons = {
    'DISCOUNT10': 10,
    'DIAGNO25': 25, // Assuming FREESHIP gives a flat $5 discount
    'SAVE20': 20
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    validateCoupon(coupon);
  };

  const validateCoupon = (coupon) => {
    const discount = validCoupons[coupon];
    if (discount !== undefined) {
      applyDiscount(discount);
      setMessage(`Coupon applied successfully! You get ${discount}% off.`);
      toast.success(message)
      setIsCouponApplied(true);
    } else {
      setMessage('Invalid coupon code.');
      setDiscountedPrice(defaultPrice); // Reset to original price if invalid
      setIsCouponApplied(false);
    }
  };

  const applyDiscount = (discount) => {
    const newPrice = defaultPrice - (defaultPrice * discount / 100);
    setDiscountedPrice(newPrice.toFixed(2)); // Round to 2 decimal places
  };

const slotCount = parseInt(tests.slots);
  const handlePaymentClick = () => {
    if (slotCount > 0) {
      window.open('https://buy.stripe.com/test_9AQg0x3w55Mq3XWdQQ', '_blank');
      navigate("/allTests");
    } else {
      setIsModalVisible(false);
      Swal.fire({
        title: "No available slots right now!!",
        icon: "error",
      });
      return;
    }
  };

  return (
    <div className="py-40">
      <div className="container mx-auto">
        <h1 className="text-6xl fontBebas font-extrabold text-center">
          TEST DETAILS
        </h1>
        <div className="hero py-20 px-20 bg-base-200">
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <img src={tests.image} className="rounded-lg shadow-2xl" />
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-6">
                  <input
                    type="text"
                    defaultValue={tests.title}
                    readOnly
                    {...register("title", { required: true })}
                    required
                    className="w-full text-3xl font-bold focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6">
                  <input
                    type="text"
                    defaultValue={tests.shortDescription}
                    readOnly
                    {...register("shortDescription", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6">
                  <input
                    type="text"
                    defaultValue={tests.date}
                    readOnly
                    {...register("date", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6">
                  <input
                    type="number"
                    defaultValue={tests.slots}
                    readOnly
                    {...register("slots", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control my-6 focus:outline-none bg-transparent mt-1 mb-4 mr-1 text-2xl font-bold">
                  <p>
                    $
                    <input
                      type="number"
                      defaultValue={tests.price}
                      readOnly
                      {...register("price", { required: true })}
                      required
                      className="focus:outline-none bg-transparent mt-1 mb-4 ml-1 text-2xl font-bold"
                    />
                  </p>
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={tests.report}
                    readOnly
                    {...register("report", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.name}
                    readOnly
                    {...register("name", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.avatar}
                    readOnly
                    {...register("avatar", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.email}
                    readOnly
                    {...register("email", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.bloodGroup}
                    readOnly
                    {...register("bloodGroup", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.district}
                    readOnly
                    {...register("district", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                <div className="form-control w-full my-6 hidden">
                  <input
                    type="text"
                    defaultValue={userInfo.upazila}
                    readOnly
                    {...register("upazila", { required: true })}
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
                {isBlock ? (
                  <h1 className="btn btn-error text-white font-bold">
                    Youre Blocked By Admin
                  </h1>
                ) : (
                  <button
                    htmlFor="my_modal_6"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                    className={isBook ? 'hidden' : "btn btn-primary"}
                  >
                    Book Now
                  </button>
                )}
              </form>
              {isModalVisible &&(<dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h3 className="font-bold text-lg">{tests.title}</h3>
                  <p className="py-4">REGULAR PRICE: ${defaultPrice}</p>
                  <form onSubmit={handleCouponSubmit} className={isCouponApplied ? 'hidden' : 'mb-4'}>
                    <label>
                      Coupon Code:
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="input input-bordered w-full max-w-xs ml-4"
                      />
                    </label>
                    <button type="submit" className="btn bg-colorPrimary">Apply Coupon</button>
                  </form>
                  <p>{message}</p>
                  <h2>Discounted Price: ${discountedPrice}</h2>
                  {/**------------------------------------- */}
                  <div className="modal-action">
                    {/* <a
                      target="blank"
                      href="https://buy.stripe.com/test_9AQg0x3w55Mq3XWdQQ"
                    >
                      PAYMENT
                    </a> */}
                    <button onClick={handlePaymentClick}>Payment</button>
                  </div>
                </div>
              </dialog>)}

              

              {/* <Link to={`/bookNow/${tests._id}`}></Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
