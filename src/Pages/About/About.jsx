const About = () => {
  return (
    <div className="md:pt-52 pt-20">
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About DiagnoCare</h1>
        <p className="text-lg text-gray-700 mb-8">
          DiagnoCare is a leading healthcare provider dedicated to delivering
          high-quality diagnostic services to our patients. With
          state-of-the-art facilities and a team of experienced healthcare
          professionals, we strive to provide accurate and timely diagnoses to
          help improve the health and well-being of our patients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our mission is to provide reliable and accessible diagnostic
              services that contribute to the early detection, prevention, and
              treatment of diseases. We are committed to delivering
              compassionate care and empowering our patients to make informed
              decisions about their health.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our vision is to be a trusted leader in diagnostic healthcare,
              known for our commitment to excellence, innovation, and
              patient-centered care. We aim to continuously improve our services
              and expand our reach to make a positive impact on the health of
              individuals and communities.
            </p>
          </div>
          <div>
            <img
              src="https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?t=st=1718083695~exp=1718087295~hmac=e2f25e64a7be8da35c9a5948df1bee0b7d48449d0b15e0199a565adf65c2bf58&w=1380"
              alt="About DiagnoCare"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
