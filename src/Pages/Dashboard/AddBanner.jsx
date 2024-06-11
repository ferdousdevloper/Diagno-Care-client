import { useForm } from "react-hook-form";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBanner = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  //const axiosSecure = useAxiosSecure();

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
      const addBanner = {
        title: data.title,
        text: data.text,
        coupon_code: data.coupon_code,
        discount_rate: parseFloat(data.discount_rate),
        status: data.status,
        image: res.data.data.display_url,
      };
      //
      const bannerRes = await axiosPublic.post("/banner", addBanner);
      console.log(bannerRes.data);
      if (bannerRes.data.insertedId) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with image url", res.data);
  };

  return (
    <div>
      <h1 className="text-6xl fontBebas font-extrabold text-center">
        UPDATE BANNER
      </h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Banner Title</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-6">
            {/* Banner Status */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Banner Status</span>
              </label>
              <select
                {...register("status", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* Discount */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Discount</span>
              </label>
              <input
                type="number"
                placeholder="Discount Rate"
                {...register("discount_rate", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* Coupon Code */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <input
                type="text"
                placeholder="Coupon Code"
                {...register("coupon_code", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-3xl bg-colorPrimary text-white" />
                    </div>
          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("text")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <button className="btn mt-10 bg-colorPrimary text-white hover:bg-black">
            Add banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;
