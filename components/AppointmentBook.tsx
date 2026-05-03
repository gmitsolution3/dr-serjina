"use client";

import type { ChangeEvent } from "react";
import { useState } from "react";
import { Button } from "./ui/button";

interface IFormData {
  name: string;
  phoneNumber: string;
  location: string;
  address: string;
}

export default function AppointmentBook() {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    phoneNumber: "",
    location: "",
    address: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div
      id="book-appointment"
      className="bg-[#423D96] flex items-center justify-center px-4 py-12 md:py-20 lg:py-[150px]"
    >
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-white space-y-4 lg:space-y-6 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-8">
              অ্যাপয়েন্টমেন্ট বুক করুন
            </h3>

            <div className="space-y-3 lg:space-y-4 text-base font-light md:text-lg">
              <p>
                আপনি নিউমোনিয়া, এজমা, টাইফয়েড, ডেংগু, সহ পেডিয়াট্রিক
                নিউরোলজি সমস্যা নিয়ে চিন্তিত?
              </p>
              <p>
                ডাঃ শেখ সারজিনা আনোয়ার বাংলাদেশের একজন প্রখ্যাত শিশু
                বিশেষজ্ঞ এবং পেডিয়েট্রিক নিউরোলজি বিশেষজ্ঞ আছেন আপনার
                সমাধানে।
              </p>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="আপনার নাম"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-sm md:text-base"
                  />
                </div>

                {/* Phone Number Field */}
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="ফোন নাম্বার"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Select Field */}
                <div>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-gray-700 text-sm md:text-base"
                  >
                    <option value="">সিলেক্ট লোকেশন</option>
                    <option value="dhaka">ঢাকা</option>
                    <option value="chittagong">চট্টগ্রাম</option>
                    <option value="sylhet">সিলেট</option>
                    <option value="rajshahi">রাজশাহী</option>
                    <option value="khulna">খুলনা</option>
                  </select>
                </div>

                {/* Address Field */}
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="ঠিকানা"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="flex justify-center pt-2 md:pt-4">
                <Button
                  variant="primary"
                  className="bg-[#4285f4] hover:bg-[#10172E]"
                >
                  সাবমিট করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
