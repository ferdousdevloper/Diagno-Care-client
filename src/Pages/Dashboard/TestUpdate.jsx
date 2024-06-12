import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
//import { useState } from "react";

const TestUpdate = () => {
  const { date, _id, shortDescription, slots, title, price } = useLoaderData();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    const testItem = {
      title: data.title,
      shortDescription: data.shortDescription,
      date: data.date,
      report: data.report,
      slots: parseFloat(data.slots),
      price: parseFloat(data.price),

      // image: data.image,
    };
    try {
      const test = await axiosSecure.patch(`/allTests/${_id}`, testItem);
      console.log(test.data);
      if (test.data.modifiedCount > 0) {
        // show success popup
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.title} is updated to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/dashboard/allTests");
      }
      console.log("banner update", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Diagno Care | Test Update</title>
      </Helmet>
      <h1 className="text-6xl fontBebas font-extrabold text-center">
        UPDATE TEST
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
              {...register("title", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="md:flex gap-6">
            {/* Discount */}
            <div className="form-control w-full my-6">
              <label className="block mb-2 " htmlFor="deadline">
                Select Deadline
              </label>
              <input
                type="date"
                defaultValue={date}
                {...register("date", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            {/* Coupon Code */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                defaultValue={price}
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Slots</span>
              </label>
              <input
                type="number"
                defaultValue={slots}
                {...register("slots", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
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
          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              defaultValue={shortDescription}
              {...register("shortDescription")}
              className="textarea textarea-bordered h-24"
              placeholder="Description"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={() => console.log("Clicked")}
            className="btn mt-10 z-10 bg-colorPrimary text-white hover:bg-black"
          >
            Update menu Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestUpdate;
