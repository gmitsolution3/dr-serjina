import { getProfileData } from "@/services/getProfileData";
import { IProfile } from "@/types";
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

export default async function Footer() {
  const res = await getProfileData();

  const profileData: IProfile = res?.data || {};

  const contactNumbers = profileData?.contactNumbers || [];
  const chambers = profileData?.chamber || [];

  // Find chambers
  const yorkChamber = chambers.find(c => c.name === "York Hospital");
  const kurmitolaChamber = chambers.find(c => c.name === "Kurmitola General Hospital");

  // Find social links
  const socialLinks = profileData?.socialLinks || [];

  return (
    <footer className="bg-[#10172E] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Dr. Serjina Anwar */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              About {profileData?.name?.english || "Dr. Serjina Anwar"}
            </h4>
            <div className="space-y-3 text-gray-300">
              <p>{profileData?.name?.english || "Dr. SK. Serjina Anwar"}</p>
              {profileData?.educationalQualification?.map((qualification, index) => (
                <p key={index}>{qualification}</p>
              ))}
            </div>

            {/* Social Media Icons */}
            {socialLinks.length > 0 && (
              <div className="flex gap-3 pt-4">
                {socialLinks.map((link) => {
                  let Icon;
                  switch (link.name?.toLowerCase()) {
                    case "facebook":
                      Icon = FacebookIcon;
                      break;
                    case "instagram":
                      Icon = InstagramIcon;
                      break;
                    case "linkedin":
                      Icon = Linkedin01Icon;
                      break;
                    case "youtube":
                      Icon = YoutubeIcon;
                      break;
                    default:
                      Icon = null;
                  }
                  return Icon ? (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2d3748] hover:bg-[#8B4F7C] transition-colors p-3 rounded-lg"
                      aria-label={link.name}
                    >
                      <HugeiconsIcon
                        icon={Icon}
                        size={20}
                        color="currentColor"
                        strokeWidth={1.5}
                      />
                    </a>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              Quick Links
            </h4>
            <nav className="space-y-3">
              <a
                href="#banner"
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
              {yorkChamber && (
                <div className="flex gap-3">
                  <HugeiconsIcon
                    icon={MapPinCheckIcon}
                    size={20}
                    color="#F8F329"
                    strokeWidth={1.5}
                    className="flex-shrink-0 mt-1"
                  />
                  <p className="leading-relaxed">
                    {yorkChamber.name} Chamber <br /> {yorkChamber.location} <br />
                    ({profileData?.chamberTime || "Sat-Mon-Wed, 7:00 PM - 9 PM"})
                  </p>
                </div>
              )}

              {/* Kurmitola Hospital */}
              {kurmitolaChamber && (
                <div className="flex gap-3">
                  <HugeiconsIcon
                    icon={MapPinCheckIcon}
                    size={20}
                    color="#F8F329"
                    strokeWidth={1.5}
                    className="flex-shrink-0 mt-1"
                  />
                  <p className="leading-relaxed">
                    {kurmitolaChamber.name}, {kurmitolaChamber.location}
                  </p>
                </div>
              )}

              {/* Phone Numbers */}
              {contactNumbers.length > 0 && (
                <div className="flex items-center gap-3">
                  <HugeiconsIcon
                    icon={TelephoneIcon}
                    size={20}
                    color="#F8F329"
                    strokeWidth={1.5}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    {contactNumbers.map((contact) => (
                      <a
                        key={contact.number}
                        href={`tel:${contact.number}`}
                        className="hover:text-yellow-400 transition-colors"
                      >
                        {contact.number}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Work Hours */}
          <div className="space-y-6">
            <h4 className="text-yellow-400 text-xl font-bold mb-4">
              Appointment Hours
            </h4>

            {/* Chamber Time */}
            {profileData?.chamberTime && (
              <div className="flex items-center gap-3 text-gray-300">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                  className="flex-shrink-0"
                />
                <div>
                  <p className="font-semibold">Chamber Time:</p>
                  <p>{profileData.chamberTime}</p>
                </div>
              </div>
            )}

            {/* Appointment Time */}
            {profileData?.appointmentTime && (
              <div className="flex items-center gap-3 text-gray-300">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={20}
                  color="#F8F329"
                  strokeWidth={1.5}
                  className="flex-shrink-0"
              />
                <div>
                  <p className="font-semibold">Appointments:</p>
                  <p>{profileData.appointmentTime}</p>
                </div>
              </div>
            )}

            {/* Online Consultancy Time */}
            {profileData?.onlineConsultancyTime && (
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
                  <p>{profileData.onlineConsultancyTime}</p>
                </div>
              </div>
            )}
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
                {profileData?.name?.english || "Dr. SK. Serjina Anwar"}
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}