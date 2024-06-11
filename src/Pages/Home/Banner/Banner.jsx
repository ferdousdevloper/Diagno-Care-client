import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";


const Banner = () => {
    const [banner, setBanner] = useState([])
    useEffect(() => {
        fetch('https://diagno-care-server-site.vercel.app/banner')
            .then(res => res.json())
            .then(data => 
                setBanner(data))
    }, [])
    console.log(banner);
    return (
        <div className="">
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                {
                    banner.map((i)=> <div key={i._id} className="relative max-h-[1000px]">
                    <img className="min-h-[400px] min-w-[400px]" src={i.image} />
                    <div className="absolute top-[0%] flex flex-col justify-center left-[0%] px-10 md:px-20 md:text-left max-w-2xl bg-gray-100 bg-opacity-20 backdrop-filter backdrop-blur-sm h-full">
                        <h1 className="fontBebas text-base md:text-6xl font-extrabold">{i.title}</h1>
                        <p className="text-lg md:text-2xl font-semibold fontLibre">{i.text}</p>
                        <p className="text-base md:text-xl font-semibold fontLibre">Coupon code: <span className="text-colorPrimary text-lg md:text-3xl">{i.coupon_code}</span></p>
                        <p className=" text-base md:text-xl font-semibold fontLibre">To get <span className="text-red-700 fontBebas md:text-5xl font-extrabold">{i.discount_rate}% </span> discount...</p>
                        <Link to="/allTests">
                        <button className="btn btn-sm md:btn-lg bg-colorPrimary hover:bg-black text-white text-sm md:text-lg font-bold border-none md:my-6">Explore more</button>
                        </Link>
                    </div>
                    
                </div>)
                }
            </Carousel>
        </div>
    );
};

export default Banner;