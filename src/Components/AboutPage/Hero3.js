import React from "react";
import { FaServer, FaLaptop, FaUsers } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { LiaCreativeCommonsShare } from "react-icons/lia";
import { MdOutlineLocalShipping } from "react-icons/md";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Support Team",
      role: "UI Designer",
      desc: "Expert guidance from design to post-purchase, ensuring a smooth and enjoyable jewelry experience.",
    },
    {
      name: "Creative Products",
      role: "CTO",
      desc: "Modern and classic jewelry, crafted to enhance events and celebrate your uniqueness.",
    },
    {
      name: "Easy Shipment",
      role: "Founder",
      desc: "Reliable, fast shipping with secure packaging to ensure jewelry arrives in perfect condition.",
    },
    {
      name: "Quality Assurance",
      role: "DevOps",
      desc: "Rigorous quality checks guarantee superior craftsmanship, durability, and unmatched perfection.",
    },
    {
      name: "Premium Material",
      role: "Software Engineer",
      desc: "Certified gold, diamonds, and gemstones ensure luxury, elegance, and lasting value.",
    },
    {
      name: "Client Management",
      role: "UX Researcher",
      desc: "Personalized service to understand preferences and build long-term, meaningful relationships.",
    },
  ];

  const roleToIcon = {
    "UI Designer": <BiSupport size={30} color="orange" />,
    CTO: <LiaCreativeCommonsShare size={30} color="orange" />,
    Founder: <MdOutlineLocalShipping size={30} color="orange" />,
    DevOps: <FaServer size={30} color="orange" />,
    "Software Engineer": <FaLaptop size={30} color="orange" />,
    "UX Researcher": <FaUsers size={30} color="orange" />,
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-15 mx-auto">
        <div className="flex flex-wrap -m-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-start p-4 rounded-lg">
                <div className="w-16 h-16 object-cover object-center flex-shrink-0 rounded-full mr-4 flex justify-center items-center">
                  {roleToIcon[member.role]}
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 font-bold uppercase font-garamond title-font">
                    {member.name}
                  </h2>
                  <p className="text-black font-brown">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
