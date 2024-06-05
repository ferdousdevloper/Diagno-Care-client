import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
// import useAxiosPublic from './../../hooks/useAxiosPublic';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from "sweetalert2";

const UpdateBanner = () => {
    const { _id,  status, text, title, coupon_code, discount_rate} = useLoaderData()
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm();
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) =>{
        
        const bannerItem = {
            title: data.title,
            text: data.text,
            coupon_code: data.coupon_code,
            discount_rate: parseFloat(data.discount_rate),
            status: data.status,
            // image: data.image,

        }
        // 
        const banner = await axiosSecure.patch(`/banner/${_id}`, bannerItem);
        console.log(banner.data)
        if(banner.data.modifiedCount > 0){
            // show success popup
            // reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is updated to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
              
              navigate("/dashboard/allBanner")
              
        }
        console.log( 'banner update', data);
    }
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
                            defaultValue={title}
                            placeholder="title"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="md:flex gap-6">
                        {/* Banner Status */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Banner Status</span>
                            </label>
                            <select defaultValue={status} {...register('status', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
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
                                defaultValue={discount_rate} 
                                placeholder="discount_rate"
                                {...register('discount_rate', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Coupon Code */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Coupon Code</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={coupon_code}
                                placeholder="coupon_code"
                                {...register('coupon_code', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea defaultValue={text} {...register('text')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>

                    <button className="btn mt-10 bg-colorPrimary text-white hover:bg-black">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBanner;