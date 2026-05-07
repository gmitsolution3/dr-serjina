"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export default function AppointmentBook() {
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

          {/* Right side - Link Button */}
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 flex justify-center items-center">
            <Link href="/appointment-booking" className="w-full flex justify-center">
              <Button
                variant="primary"
                className="bg-[#4285f4] hover:bg-[#10172E] w-full md:w-auto min-w-[200px]"
              >
                অ্যাপয়েন্টমেন্ট বুক করুন
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}