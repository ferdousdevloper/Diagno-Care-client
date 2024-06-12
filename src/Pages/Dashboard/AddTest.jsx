import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddTest = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const addTest = {
        title: data.title,
        shortDescription: data.shortDescription,
        date: data.date,
        report: data.report,
        price: parseFloat(data.price,),
        slots: parseFloat(data.slots,),
        image: res.data.data.display_url,
      };
      //
      const testRes = await axiosSecure.post("/allTests", addTest);
      console.log(testRes.data);
      if (testRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.title} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/allTests")
      }
    }
    console.log("with image url", res.data);
  };
  return (
    <div>
      <Helmet>
        <title>Diagno Care | Add Test</title>
      </Helmet>
      <h1 className="text-6xl fontBebas font-extrabold text-center">
        ADD TEST
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Test Title</span>
            </label>
            <input
              type="text"
              placeholder="title"
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-6">
            {/* Discount */}
            <div className="form-control w-full my-6">
               <label className="block mb-2 " htmlFor="deadline">
                 Select Date
               </label>
               <input 
               type="date"
                 {...register("date", { required: true })}
                 className="input input-bordered w-full" />
             </div>
             <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price $$$"
                className="input input-bordered w-full"
              />
            </div>
            {/* Coupon Code */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Slots</span>
              </label>
              <input
                type="number"
                {...register("slots", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            
          </div>
          <div className="md:flex gap-6 items-center">
          <div className="form-control w-full my-6">
          <label className="label">
              <span className="label-text">Thumbnail</span>
            </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-3xl bg-colorPrimary text-white"
              />
            </div>
            <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Default Report Status</span>
            </label>
            <input
              type="text"
              placeholder="Report"
              defaultValue="pending"
              readOnly
              {...register("report", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          </div>
          
          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("shortDescription")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <button className="btn mt-10 bg-colorPrimary text-white hover:bg-black">
            Add New Test
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;
