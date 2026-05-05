"use client";
import { useFetch } from "@/hooks/swr/useFetch";
import { IProfile } from "@/types";
import {
  CallIcon,
  MapPinCheckIcon,
  Menu01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderSideMenu from "./HeaderSideMenu";
import MenuLink from "./MenuLink";
import { Button } from "./ui/button";

// Skeleton Components
const LocationSkeleton = () => (
  <div className="hidden lg:flex items-center space-x-3 border-r border-[#EAEAEA] pe-5">
    <span className="bg-primary text-white p-4 rounded-t-2xl">
      <HugeiconsIcon
        icon={MapPinCheckIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    </span>
    <div className="space-y-2">
      <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const PhoneSkeleton = () => (
  <div className="hidden lg:flex items-center space-x-3 border-r border-[#EAEAEA] pe-5">
    <span className="bg-primary text-white p-4 rounded-t-2xl">
      <HugeiconsIcon
        icon={CallIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    </span>
    <div className="space-y-2">
      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const MobileLocationSkeleton = () => (
  <div className="flex items-center space-x-3">
    <span className="bg-primary text-white p-3 rounded-t-2xl">
      <HugeiconsIcon
        icon={MapPinCheckIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    </span>
    <div className="space-y-2 flex-1">
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-48 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const MobilePhoneSkeleton = () => (
  <div className="flex items-center space-x-3">
    <span className="bg-primary text-white p-3 rounded-t-2xl">
      <HugeiconsIcon
        icon={CallIcon}
        size={24}
        color="currentColor"
        strokeWidth={1.5}
      />
    </span>
    <div className="space-y-2 flex-1">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data, isLoading, isError, refetch } = useFetch("/profile");

  const profileData: IProfile = data?.data || {};

  console.log(profileData);

  // Render location content
  const renderLocationContent = () => {
    if (isLoading) {
      return (
        <div className="text-[#525766] text-sm flex flex-col space-y-1">
          <div className="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      );
    }

    if (profileData?.chamber?.length) {
      return (
        <p className="text-[#525766] text-sm flex flex-col">
          {profileData.chamber.map((chamber) => (
            <span key={chamber.name}>
              {chamber?.name}, {chamber?.location}
            </span>
          ))}
        </p>
      );
    }

    return <p className="text-[#525766] text-sm">লোকেশন তথ্য পাওয়া যায়নি</p>;
  };

  // Render phone content
  const renderPhoneContent = () => {
    if (isLoading) {
      return (
        <div className="text-[#525766] text-sm flex flex-col space-y-1">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      );
    }

    if (profileData?.contactNumbers?.length) {
      return (
        <p className="text-[#525766] text-sm flex flex-col">
          {profileData.contactNumbers.slice(0, 3).map((number) => (
            <a key={number.number} href={`tel:${number?.number}`}>
              {number?.number}
            </a>
          ))}
        </p>
      );
    }

    return <p className="text-[#525766] text-sm">কোনো নম্বর পাওয়া যায়নি</p>;
  };

  // Render mobile location content
  const renderMobileLocationContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-1 flex-1">
          <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
      );
    }

    if (profileData?.chamber?.length) {
      return (
        <div>
          <h3 className="font-medium text-sm">লোকেশন</h3>
          <p className="text-[#525766] text-xs">
            {profileData.chamber.map((chamber, index) => (
              <span key={chamber.name}>
                {chamber?.name}, {chamber?.location}
                {index < profileData.chamber.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="font-medium text-sm">লোকেশন</h3>
        <p className="text-[#525766] text-xs">লোকেশন তথ্য পাওয়া যায়নি</p>
      </div>
    );
  };

  // Render mobile phone content
  const renderMobilePhoneContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-1 flex-1">
          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      );
    }

    if (profileData?.contactNumbers?.length) {
      return (
        <div>
          <h3 className="font-medium text-sm">সিরিয়ালের জন্য</h3>
          <p className="text-[#525766] text-xs">
            {profileData.contactNumbers.slice(0, 3).map((number, index) => (
              <span key={number.number}>
                <a href={`tel:${number?.number}`}>{number?.number}</a>
                {index < Math.min(2, profileData.contactNumbers.length - 1) && ", "}
              </span>
            ))}
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="font-medium text-sm">সিরিয়ালের জন্য</h3>
        <p className="text-[#525766] text-xs">কোনো নম্বর পাওয়া যায়নি</p>
      </div>
    );
  };

  return (
    <header className="py-4 lg:py-8">
      <div className="container mx-auto px-5 lg:px-0">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-around gap-4 lg:gap-0">
          {/* Logo */}
          <div className="w-full lg:w-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl lg:text-2xl">
              <Image
                height={500}
                width={500}
                src="/logo.png"
                alt="Logo"
                className="w-32"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <HugeiconsIcon
                icon={Menu01Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </button>
          </div>

          {/* Desktop Contact Info - Location */}
          <div className="hidden lg:flex items-center space-x-3 border-r border-[#EAEAEA] pe-5">
            <span className="bg-primary text-white p-4 rounded-t-2xl">
              <HugeiconsIcon
                icon={MapPinCheckIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <h3 className="font-medium">লোকেশন</h3>
              {renderLocationContent()}
            </div>
          </div>

          {/* Desktop Contact Info - Phone */}
          <div className="hidden lg:flex items-center space-x-3 border-r border-[#EAEAEA] pe-5">
            <span className="bg-primary text-white p-4 rounded-t-2xl">
              <HugeiconsIcon
                icon={CallIcon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />
            </span>
            <div>
              <h3 className="font-medium">সিরিয়ালের জন্য</h3>
              {renderPhoneContent()}
            </div>
          </div>

          {/* Appointment Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              variant="primary"
              className="bg-primary hover:bg-[#10172E]"
            >
              <a href="https://forms.gle/STorhY5dkm5qKefP7" target="_blank">
                অ্যাপয়েন্টমেন্ট বুক করুন
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        {pathname !== "/profile-detail" && (
          <nav className="hidden lg:block mt-8 border-t border-[#EAEAEA] pt-6">
            <div className="flex items-center justify-between">
              <ul className="flex items-center justify-start space-x-8 uppercase">
                <li>
                  <MenuLink
                    to="/"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    Home
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    to="#banner"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    About
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    to="#book-appointment"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    Book Appointment
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    to="#services"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    Services
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    to="#gallery"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    Gallery
                  </MenuLink>
                </li>
                <li>
                  <MenuLink
                    to="#contact"
                    className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                  >
                    Contact
                  </MenuLink>
                </li>
              </ul>

              <div>
                <HeaderSideMenu />
              </div>
            </div>
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden mt-4 border-t border-[#EAEAEA] pt-4">
            <ul className="space-y-3">
              <li>
                <MenuLink
                  to="/"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  to="#banner"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  to="#book-appointment"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  to="#services"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  to="#gallery"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gallery
                </MenuLink>
              </li>
              <li>
                <MenuLink
                  to="#contact"
                  className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </MenuLink>
              </li>
            </ul>

            {/* Mobile Contact Info */}
            <div className="mt-6 space-y-4 border-t border-[#EAEAEA] pt-4">
              {/* Location */}
              <div className="flex items-center space-x-3">
                <span className="bg-primary text-white p-3 rounded-t-2xl">
                  <HugeiconsIcon
                    icon={MapPinCheckIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </span>
                {renderMobileLocationContent()}
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <span className="bg-primary text-white p-3 rounded-t-2xl">
                  <HugeiconsIcon
                    icon={CallIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </span>
                {renderMobilePhoneContent()}
              </div>

              {/* Mobile Appointment Button */}
              <Button
                asChild
                variant="primary"
                className="bg-primary hover:bg-[#10172E] w-full"
              >
                <a href="https://forms.gle/STorhY5dkm5qKefP7" target="_blank">
                  অ্যাপয়েন্টমেন্ট বুক করুন
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}