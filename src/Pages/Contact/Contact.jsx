

const Contact = () => {
    return (
        <div className="container mx-auto px-4 py-8 pt-52">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        <hr className="my-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Have a question or need assistance? Feel free to contact us using the form below. Our team will get back to you as soon as possible.
                </p>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Your Name</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Your Email</label>
                        <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
                        <textarea className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Enter your message" rows="4"></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-colorPrimary text-white py-2 px-4 rounded-md transition duration-300 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark">Send Message</button>
                    </div>
                </form>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Our Location</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Find us at the following address:
                </p>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">DiagnoCare Clinic</h3>
                    <p className="text-gray-700 mb-1">123 Main Street</p>
                    <p className="text-gray-700">City, State, ZIP Code</p>
                </div>
                <iframe title="DiagnoCare Location" className="w-full h-64 rounded-lg shadow-md" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678910111213!2d-71.0564756275327!3d42.36393702854962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3775f5c94fb9b%3A0x7fbc8741c4029314!2sDiagnoCare%20Clinic!5e0!3m2!1sen!2sus!4v1623371873566!5m2!1sen!2sus" allowFullScreen></iframe>
            </div>
        </div>
    </div>
    );
};

export default Contact;