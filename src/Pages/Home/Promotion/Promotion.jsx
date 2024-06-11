import { Link } from "react-router-dom";


const Promotion = () => {
    const promotions = [
        {
          id: 1,
          title: "Summer Health Checkup",
          description: "Get a comprehensive health checkup at a discounted price. Ensure your well-being this summer!",
          image: "https://i.ibb.co/QrMLKpX/female-nurse-clinic-practicing-medicine-23-2149868902.jpg",
          discount: "20% OFF",
          link: "/allTests",
          coupon: "DIAGNO20"
        },
        {
          id: 2,
          title: "Consultation",
          description: "Book an appointment today and get a free consultation with our top specialists.",
          image: "https://i.ibb.co/PWr3X7D/african-american-doctor-analyzing-medical-reports-with-her-colleagues-clinic-637285-11176.jpg",
          discount: "25% OFF",
          link: "/promotions/free-consultation",
          coupon: "DIAGNO25"
        },
        {
          id: 3,
          title: "Family Health Package",
          description: "Comprehensive health packages for your entire family at an unbeatable price. Health for all!",
          image: "https://i.ibb.co/8bqpGw0/doctor-asking-nurse.jpg",
          discount: "30% OFF",
          link: "/promotions/family-health-package",
          coupon: "DIAGNO30"
        },
      ];
    return (
        <div className="md:container md:mx-auto mx-10 mt-20">
      <h1 className="text-xl md:text-6xl fontBebas font-extrabold text-center mb-10">
        PROMOTIONS
      </h1>
      <hr className="my-10 border-2" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {promotions.map((promotion) => (
          <div key={promotion.id} className="card w-full bg-white shadow-2xl rounded-lg overflow-hidden transform transition duration-500 md:hover:scale-105 border-b-[10px] border-colorPrimary rounded-bl-[100px]">
            <figure className="relative">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg md:text-2xl font-bold opacity-0 hover:opacity-100 transition-opacity duration-300">
                {promotion.discount} <br />
                
              </div>
            </figure>
            <div className="p-6">
              <h2 className="text-lg md:text-2xl font-semibold mb-2">{promotion.title}</h2>
              <p className="text-sm md:text-base text-gray-700 mb-4">{promotion.description}</p>
              <p className="text-sm md:text-base text-gray-700 mb-4"><strong>Coupon Code:</strong> {promotion.coupon}</p>
              <div className="flex justify-end">
                <Link to="/allTests" className="btn bg-colorPrimary hover:bg-black text-white font-bold py-2 px-4 rounded-full transition duration-300">Learn More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Promotion;