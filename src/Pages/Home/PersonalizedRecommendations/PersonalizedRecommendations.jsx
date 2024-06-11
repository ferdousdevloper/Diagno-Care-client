import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useAxiosPublic from './../../../hooks/useAxiosPublic';
import axios from 'axios';
import { useEffect, useState } from 'react';
//import { useQuery } from '@tanstack/react-query';

const PersonalizedRecommendations = () => {

    const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recommendations`);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

      console.log(recommendations);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000, // 2 seconds
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      };
    
    return (
        <div className="container mx-auto my-20 px-8">
      <h1 className="md:text-6xl text-3xl fontBebas font-extrabold text-center mb-10">
        RECOMMENDATION
      </h1>
      <hr className="my-10 border-2" />
      <Slider {...settings}>
        {recommendations.map((recommendation) => (
          <div key={recommendation._id} className="p-4 px-4">
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden">
              <figure className="relative">
                <img
                  src={recommendation.image}
                  alt={recommendation.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="p-6">
                <h2 className=" text-lg md:text-2xl font-semibold mb-2">{recommendation.title}</h2>
                <p className="text-sm md:text-base text-gray-700 mb-4">{recommendation.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    );
};

export default PersonalizedRecommendations;