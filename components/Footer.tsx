// components/Footer.tsx
import {
  ArrowRight02Icon,
  Clock01Icon,
  FacebookIcon,
  InstagramIcon,
  Linkedin01Icon,
  MapPinCheckIcon,
  TelephoneIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Footer() {
  return (
    <footer className="bg-[#10172E] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Dr. Serjina Anwar */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              About Dr. Serjina Anwar
            </h4>
            <div className="space-y-3 text-gray-300">
              <p>Dr. SK. Serjina Anwar</p>
              <p>MBBS (COMC), BCS (Health)</p>
              <p>
                DCH (Bangladesh Medical University, Ex-PG Hospital)
              </p>
              <p>FCPS (Paediatrics, BCPS)</p>
              <p>
                MD (Paediatric Neurology & Neuro Development,
                Bangladesh Medical University)
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-3 pt-4">
              <a
                href="#"
                className="bg-[#2d3748] hover:bg-[#8B4F7C] transition-colors p-3 rounded-lg"
                aria-label="Facebook"
              >
                <HugeiconsIcon
                  icon={FacebookIcon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="#"
                className="bg-[#2d3748] hover:bg-[#8B4F7C] transition-colors p-3 rounded-lg"
                aria-label="Instagram"
              >
                <HugeiconsIcon
                  icon={InstagramIcon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="#"
                className="bg-[#2d3748] hover:bg-[#8B4F7C] transition-colors p-3 rounded-lg"
                aria-label="LinkedIn"
              >
                <HugeiconsIcon
                  icon={Linkedin01Icon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </a>
              <a
                href="#"
                className="bg-[#2d3748] hover:bg-[#8B4F7C] transition-colors p-3 rounded-lg"
                aria-label="YouTube"
              >
                <HugeiconsIcon
                  icon={YoutubeIcon}
                  size={20}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              Quick Links
            </h4>
            <nav className="space-y-3">
              <a
                href="#about"
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={16}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                About Us
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={16}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                Services
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={16}
                  color="currentColor"
                  strokeWidth={1.5}
                />
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              Contact Details
            </h4>
            <div className="space-y-4 text-gray-300">
              {/* York Hospital Chamber */}
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={MapPinCheckIcon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                  className="flex-shrink-0 mt-1"
                />
                <p className="leading-relaxed">
                  York Hospital Chamber <br /> House 12 & 13, Road no:
                  22, Block: K, Banani, Dhaka - 1213 <br />{" "}
                  (Sat-Mon-Wed, 7:00 PM - 9 PM)
                </p>
              </div>

              {/* Kurmitola Hospital */}
              <div className="flex gap-3">
                <HugeiconsIcon
                  icon={MapPinCheckIcon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                  className="flex-shrink-0 mt-1"
                />
                <p className="leading-relaxed">
                  Kurmitola General Hospital, Dhaka
                </p>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-center gap-3">
                <HugeiconsIcon
                  icon={TelephoneIcon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
                <div className="flex flex-col">
                  <a
                    href="tel:+8801339511108"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    +8801339511108
                  </a>
                  <a
                    href="tel:+8801992222555"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    +8801992222555
                  </a>
                  <a
                    href="tel:+8801992222777"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    +8801992222777
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Work Hours */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              PT Appointment Hours
            </h4>

            {/* PT Service Time */}
            <div className="flex items-center gap-3 text-gray-300">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={20}
                color="#F8F329"
                strokeWidth={1.5}
                className="flex-shrink-0"
              />
              <div>
                <p className="font-semibold">PT Service Time:</p>
                <p>7 PM - 9 PM</p>
              </div>
            </div>

            {/* PT Appointments */}
            <div className="flex items-center gap-3 text-gray-300">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={20}
                color="#F8F329"
                strokeWidth={1.5}
                className="flex-shrink-0"
              />
              <div>
                <p className="font-semibold">PT Appointments:</p>
                <p>11:00 AM - 11:00 PM</p>
              </div>
            </div>

            {/* Online Consultancy Time */}
            <div className="flex items-center gap-3 text-gray-300">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={20}
                color="#F8F329"
                strokeWidth={1.5}
                className="flex-shrink-0"
              />
              <div>
                <p className="font-semibold">
                  Online Consultancy Time:
                </p>
                <p>11 AM - 11 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>
              Design & Developed By{" "}
              <a
                className="text-blue-500 hover:text-blue-400 transition-colors"
                href="https://www.gmitsolution.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                GM IT
              </a>
            </p>
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1rBqyAvFFWCFzQ0E77YBypDR6r-kFQliqPBnfTadicqQ/edit?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors"
              >
                Dr. SK. Serjina Anwar
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
