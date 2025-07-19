import React from "react";
import { BiBarChart } from "react-icons/bi";
import { FaShare, FaFacebook, FaTwitter, FaPinterest } from "react-icons/fa";

const SocialMetricsSidebar = () => {
  // Content data for metrics
  const metrics = [
    {
      id: "views",
      icon: <BiBarChart className="w-5 h-5" />,
      label: "views",
      count: "1.6K",
    },
    {
      id: "shares",
      icon: <FaShare className="w-4 h-4" />,
      label: "shares",
      count: "996K",
    },
    {
      id: "facebook",
      icon: <FaFacebook className="w-4 h-4" />,
      label: null,
      count: "125",
      hoverClass: "hover:text-blue-600",
    },
    {
      id: "twitter",
      icon: <FaTwitter className="w-4 h-4" />,
      label: null,
      count: "48",
      hoverClass: "hover:text-blue-400",
    },
    {
      id: "pinterest",
      icon: <FaPinterest className="w-4 h-4" />,
      label: null,
      count: "425",
      hoverClass: "hover:text-red-600",
    },
  ];

  return (
    <div className="fixed left-8 top-1/4 flex flex-col items-center space-y-6 text-gray-600">
      {metrics.map(({ id, icon, label, count, hoverClass = "" }) => (
        <div
          key={id}
          className={`flex flex-col items-center space-y-1 cursor-pointer ${hoverClass}`}
        >
          {icon}
          {label && <span className="text-xs">{label}</span>}
          <span className="text-sm font-medium">{count}</span>
        </div>
      ))}
    </div>
  );
};

export default SocialMetricsSidebar;
