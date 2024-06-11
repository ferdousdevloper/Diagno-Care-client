import { FaUserMd } from "react-icons/fa";

const doctors = [
    {
        id: 1,
        name: "Dr. John Doe",
        specialty: "Cardiologist",
        image: "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1718084210~exp=1718087810~hmac=c04a21688798a8bdfa9e2aaaec52500f4a07327a5d1297abb7ce2fde07a5a276&w=1380",
    },
    {
        id: 2,
        name: "Dr. Jane Smith",
        specialty: "Pediatrician",
        image: "https://img.freepik.com/free-photo/portrait-young-doctor-holding-stethoscope_23-2148352015.jpg?t=st=1718084273~exp=1718087873~hmac=5e92288006a8384c9cd09adb3390c7b92e7bd1d7120296a332696c21afa25f4b&w=1380",
    },
    {
        id: 3,
        name: "Dr. David Johnson",
        specialty: "Dermatologist",
        image: "https://img.freepik.com/free-photo/cheerful-doctor-making-notes-looking-away_23-2147896151.jpg?t=st=1718084412~exp=1718088012~hmac=d25097867b64941d7320b2a93ab244149193be531bd9ed00d6ea68fe58ad6847&w=996",
    },
    {
        id: 4,
        name: "Dr. Emily Wilson",
        specialty: "Oncologist",
        image: "https://img.freepik.com/free-photo/portrait-young-female-doctor_23-2148396648.jpg?t=st=1718084883~exp=1718088483~hmac=10563ba5ecc89175cfba35c07e9e790fbeff69eb281eb2799f80207f24ed0423&w=1060",
    },
];
const Doctors = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-52">
            <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Doctors</h1>
            <hr className="my-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {doctors.map(doctor => (
                    <div key={doctor.id} className="rounded-lg shadow-xl p-6 bg-white">
                        <div className="flex items-center justify-center rounded-full bg-colorPrimary w-24 h-24 mx-auto mb-4">
                            <FaUserMd className="text-white text-4xl" />
                        </div>
                        <img src={doctor.image} alt={doctor.name} className="rounded-full mx-auto mb-4 w-[150px] h-[150px]" />
                        <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
                        <p className="text-lg text-gray-700 mb-2">{doctor.specialty}</p>
                        <button className="bg-colorPrimary text-white py-2 px-4 rounded-md transition duration-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">Book Appointment</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;