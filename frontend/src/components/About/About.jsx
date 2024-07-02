import React from "react";

const About = () => {
  const visitLinkedIn = () => {
    window.location = "https://www.linkedin.com/in/umesh-choudhary-67980a242/";
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>
        <div className="flex flex-col items-center">
          <img
            className="w-40 h-40 rounded-full mb-4"
            src="https://w0.peakpx.com/wallpaper/290/133/HD-wallpaper-gb-whatsapp-dp-tiger-smoky-effect-animal.jpg"
            alt="Founder"
          />
          <h2 className="text-xl font-semibold mb-2">Umesh Choudhary</h2>
          <button
            onClick={visitLinkedIn}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Visit LinkedIn
          </button>
          <p className="mt-4 text-gray-600 px-4">
            This is an Ecommerce Website made by @Umesh Choudhary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
