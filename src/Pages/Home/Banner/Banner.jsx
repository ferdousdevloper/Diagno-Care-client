import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    const [banner, setBanner] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/banner')
            .then(res => res.json())
            .then(data => 
                setBanner(data))
    }, [])
    console.log(banner);
    return (
        <div className="">
            <Carousel autoPlay infiniteLoop>
                {
                    banner.map((i)=> <div key={i._id} className="relative max-h-[800px]">
                    <img className="" src={i.image} />
                    <div className="absolute top-[30%] left-[10%] text-left max-w-2xl">
                        <h1 className="fontBebas text-6xl font-extrabold">{i.title}</h1>
                        <p className="text-2xl font-semibold fontLibre">{i.text}</p>
                        <p className="text-xl text-gray-500 font-semibold fontLibre">Use this coupon code: <span className="text-colorPrimary text-3xl">{i.coupon_code}</span></p>
                        <p className="text-xl text-gray-500 font-semibold fontLibre">To get <span className="text-red-700 fontBebas text-5xl font-extrabold">{i.discount_rate}% </span> discount...</p>
                    </div>
                    
                </div>)
                }
            </Carousel>
        </div>
    );
};

export default Banner;