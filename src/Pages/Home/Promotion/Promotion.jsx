

const Promotion = () => {
    const promotions = [
        {
          id: 1,
          title: "Summer Health Checkup",
          description: "Get a comprehensive health checkup at a discounted price. Ensure your well-being this summer!",
          image: "https://img.freepik.com/free-photo/female-nurse-clinic-practicing-medicine_23-2149868902.jpg?t=st=1718074329~exp=1718077929~hmac=652636beb174a37e729f97087b1a5bdba8bb874706269d33b83a7b0638fc8f11&w=1380",
          discount: "20% OFF",
          link: "/allTests",
          coupon: "DIAGNO20"
        },
        {
          id: 2,
          title: "Consultation",
          description: "Book an appointment today and get a free consultation with our top specialists.",
          image: "https://img.freepik.com/free-photo/african-american-doctor-analyzing-medical-reports-with-her-colleagues-clinic_637285-11176.jpg?t=st=1718074412~exp=1718078012~hmac=5ea456eb14de3bd3ae7fee048340305ff73ffd96ba212abb8c3e45ae0403ce1b&w=1380",
          discount: "25% OFF",
          link: "/promotions/free-consultation",
          coupon: "DIAGNO25"
        },
        {
          id: 3,
          title: "Family Health Package",
          description: "Comprehensive health packages for your entire family at an unbeatable price. Health for all!",
          image: "https://img.freepik.com/free-photo/doctor-asking-nurse-pills-consultation-medical-office-physician-specialist-medicine-providing-health-care-services-consultation-diagnostic-examination-treatment-hospital-cabinet_482257-14532.jpg?t=st=1718074520~exp=1718078120~hmac=0b1c2434c1d04ac322380088c7f578aa42a446aa5aabb071d837de637052fd4e&w=1480",
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
                <a href={promotion.link} className="btn bg-colorPrimary hover:bg-black text-white font-bold py-2 px-4 rounded-full transition duration-300">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Promotion;