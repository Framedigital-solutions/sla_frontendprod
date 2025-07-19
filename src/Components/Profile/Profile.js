import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { userStore } from "../../store/userStore";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "name",
    email: "name@gmail.com",
    phone: "",
    location: "India",
    profileImage:
      "https://img.freepik.com/premium-vector/gold-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4191.jpg?w=900", // You can replace with user's actual image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved data:", profileData);
    alert("Profile updated successfully!");
  };

  const token = localStorage.getItem("token");

  // console.log("token from phon login " + token);

  return (
    <section className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-xl border rounded-xl flex flex-col md:flex-row overflow-hidden">
        {/* Left image */}
        <div className="md:w-1/2 hidden md:block">
          <img
            src="https://manubhai.in/SocialMedia/post_artworks/DGBD00687.jpg"
            alt="Jewelry Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 relative">
          {/* Top icons */}
          <div className="flex justify-between items-center mb-4">
            <FaUser className="text-xl text-gray-500" />
            <IoClose className="text-2xl text-gray-800 cursor-pointer hover:text-red-500" />
          </div>

          {/* Profile image and name */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profileData.profileImage}
              alt="User"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h3 className="font-semibold text-lg">{profileData.name}</h3>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email account
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile number
              </label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                placeholder="Add number"
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="bg-[#3A1E1E] text-white py-2 px-6 rounded-md hover:bg-[#2a1313] transition"
            >
              Save Change
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
