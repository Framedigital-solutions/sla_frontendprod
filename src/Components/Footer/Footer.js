import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-96">
      <div className="flex-grow"></div>

      <footer className="text-gray-600 bg-[#E9F1ED] body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-y-10">
          {/* Logo & Description */}
          <div className="md:w-1/2 flex items-center gap-4 text-center md:text-left">
            <img
              src="logone.png"
              alt="Sri Laxmi Alankar Logo"
              className="w-44 h-auto object-contain"
            />
            <p className="text-2xl font-garmond text-black max-w-md">
              Sri Laxmi Alankar is more than a jewelry store—it is a destination
              for those who cherish the art of fine jewelry.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Costume */}
            <div>
              <h2 className="font-bold text-[#000000] text-sm mb-3 uppercase">
                Costume
              </h2>
              <ul className="list-none space-y-2">
                <li>
                  <a href="/blog" className="text-gray-600 hover:text-gray-800">
                    Our Blogs
                  </a>
                </li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h2 className="font-bold text-[#000000] text-sm mb-3 uppercase">
                About Us
              </h2>
              <ul className="list-none space-y-2">
                <li>
                  <a href="/shop" className="text-gray-600 hover:text-gray-800">
                    Our Products
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping-policy"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Shipping and Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/Support"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Catalog */}
            <div>
              {/* <ul className="list-none space-y-2">
                <li>
                  <a
                    href="/earrings"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Earrings
                  </a>
                </li>
                <li>
                  <a
                    href="/pendant"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Pendant
                  </a>
                </li>
                <li>
                  <a
                    href="/rings"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Rings
                  </a>
                </li>
                <li>
                  <a
                    href="/chain"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Chain
                  </a>
                </li>
                <li>
                  <a
                    href="/bangles"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Bangles
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="bg-gray-100 py-4">
          <div className="container mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
              © 2025 Sri Laxmi Alankar Jewellery. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {[
                { src: "stripe.png", alt: "Stripe Payment" },
                { src: "american.png", alt: "American Express" },
                { src: "paypal.jpg", alt: "PayPal" },
                { src: "visa.png", alt: "Visa Card" },
                { src: "applepy.png", alt: "Apple Pay" },
              ].map(({ src, alt }) => (
                <img
                  key={alt}
                  src={src}
                  alt={alt}
                  className="w-12 h-8 object-contain"
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
