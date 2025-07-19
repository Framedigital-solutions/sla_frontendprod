import React from "react";
import { FaPlay } from "react-icons/fa";

const HeroSection1 = () => {
  // Updated content
  const content = {
    heading: "History of Shri Laxmi Alankar",
    description: `
      Since its establishment in ………, Shri Laxmi Alankar has stood as a shining beacon of
      excellence in the jewelry industry, blending tradition, artistry, and innovation into every
      creation. Founded in the heart of Muzaffarpur, a city rich in cultural heritage, our
      journey began with a vision to provide exquisite and high-quality jewelry that
      would celebrate the timeless beauty of Indian craftsmanship. 
    `,
    Expanding:
      "As our reputation grew, so did our commitment to catering to diverse tastes and preferences. Over the years, Shri Laxmi Alankar expanded its offerings to include a wide range of jewelry, blending the timeless elegance of traditional designs with the sleek sophistication ofcontemporary styles. From intricately crafted gold and diamond pieces that honor India’scultural heritage to modern designs tailored to meet the dynamic tastes of the newgeneration, we ensure that every customer finds something that resonates with their uniquestyle",
    imageAlt: "hero",
    imageSrc: "About2.png",
  };

  return (
    <section className="text-gray-600 body-font my-11">
      <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
        {/* Image Section */}
        {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            className="object-cover object-center rounded-lg border-2 border-orange-400"
            alt={content.imageAlt}
            src={content.imageSrc}
          />
        </div> */}

        <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <img
            src="/About2.png" // Replace with actual image path
            alt="Woman"
            className="w-full h-full object-cover rounded-tl-[47%] rounded-tr-[47%] overflow-hidden"
          />
          {/* Border Effect */}
          <div className="absolute w-full h-full top-2 left-2 border-2 border-orange-500 rounded-tl-[47%] rounded-tr-[47%]"></div>
        </div>

        {/* Text Section */}
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {content.heading}
          </h2>
          <p className="mb-8 leading-relaxed font-brown text-black text-start">
            {content.description.split("\n").map((line, index) => (
              <span key={index}>
                {line.trim()}
                <br />
              </span>
            ))}
          </p>
          <p className="mb-8 leading-relaxed font-brown text-black text-start">
            {content.Expanding.split("\n").map((line, index) => (
              <span key={index}>
                {line.trim()}
                <br />
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1;
