import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const FeatureSection = () => {
  const content = {
    heading: "Let’s Connect",
    description:
      "We’d love to hear from you! Whether you have a question, need expert guidance, or want to explore our exquisite jewelry collections, our team is always ready to assist you. Feel free to reach out—we're here to make your shopping experience seamless, enjoyable, and truly special.",
    contactDetails: {
      phone: "+91-XXXXXXXXXX",
      email: "contact@shrilaxmialankar.com",
      address: "Shri Laxmi Alankar, Main Road, Muzaffarpur, Bihar",
    },
    buttonText: "Contact Now",
    imageSrc: "https://i.ytimg.com/vi/fCB-Fb2aFL4/maxresdefault.jpg",
    imageAlt: "feature",
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <img
            alt={content.imageAlt}
            className="object-cover object-center w-full h-full"
            src={content.imageSrc}
            style={{ maxWidth: "40rem", maxHeight: "30rem" }}
          />
        </div>

        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-left">
          <div className="flex flex-col mb-10 lg:items-start items-start">
            <div className="flex-grow">
              <h1 className="text-gray-900 text-3xl lg:text-4xl title-font font-bold mb-3">
                {content.heading}
              </h1>
              <p className="leading-relaxed text-base text-gray-700">
                {content.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col mb-10 lg:items-start items-start">
            <div className="flex flex-wrap items-center space-x-4 lg:space-x-20 mt-5 mb-4">
              <div className="flex items-center space-x-2 mb-2 lg:mb-0">
                <FaPhone className="text-black" size={20} />
                <span className="text-black">
                  {content.contactDetails.phone}
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2 lg:mb-0">
                <FaEnvelope className="text-black" size={20} />
                <span className="text-black">
                  {content.contactDetails.email}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-5 mb-4">
              <FaMapMarkerAlt className="text-black" size={20} />
              <span className="text-black">
                {content.contactDetails.address}
              </span>
            </div>
            <div className="flex items-center mt-6 space-x-2">
              <button className="text-white bg-orange-500 py-2 px-4  hover:bg-orange-600 w-full lg:w-80">
                {content.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
