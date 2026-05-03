"use client";
import Link from "next/link";
// import { Menu, X } from "lucide-react";
import { headerData } from "@/data/header.data";
import { Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HeaderSideMenu from "./HeaderSideMenu";
import MenuLink from "./MenuLink";
import { Button } from "./ui/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  return (
    <header className="py-4 lg:py-8">
      <div className="container mx-auto px-5 lg:px-0">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-around gap-4 lg:gap-0">
          {/* Logo */}
          <div className="w-full lg:w-auto flex justify-between items-center">
            <Link
              href={headerData.logo.link}
              className="font-bold text-xl lg:text-2xl"
            >
              {headerData.logo.text}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <HugeiconsIcon
                  icon={Menu01Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              ) : (
                <HugeiconsIcon
                  icon={Menu01Icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              )}
            </button>
          </div>

          {/* Desktop Contact Info */}
          {headerData.contactInfo.map((info, idx) => (
            <div
              key={idx}
              className="hidden lg:flex items-center space-x-3 border-r border-[#EAEAEA] pe-5"
            >
              <span className="bg-primary text-white p-4 rounded-t-2xl">
                <HugeiconsIcon
                  icon={info.icon}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              </span>
              <div>
                <h3 className="font-medium">{info.title}</h3>
                <p className="text-[#525766] text-sm flex flex-col">
                  {info.link
                    ? info.description.map((item) => (
                        <a href={`tel:${item}`}>{item}</a>
                      ))
                    : info.description.map((item) => (
                        <span>{item}</span>
                      ))}
                </p>
              </div>
            </div>
          ))}

          {/* Appointment Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              variant="primary"
              className="bg-primary hover:bg-[#10172E]"
            >
              <a
                href={headerData.appointmentButton.link}
                target="_blank"
              >
                {headerData.appointmentButton.text}
              </a>
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        {pathname !== "/doctor-profile" && (
          <nav className="hidden lg:block mt-8 border-t border-[#EAEAEA] pt-6">
            <div className="flex items-center justify-between">
              <ul className="flex items-center justify-start space-x-8 uppercase">
                {headerData.navItems.map((item, idx) => (
                  <li key={idx}>
                    <MenuLink
                      to={item.to}
                      className="text-[#423D96] hover:text-primary font-medium transition-colors text-sm"
                    >
                      {item.name}
                    </MenuLink>
                  </li>
                ))}
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
              {headerData.navItems.map((item, idx) => (
                <li key={idx}>
                  <MenuLink
                    to={item.to}
                    className="block text-[#423D96] hover:text-primary font-medium transition-colors py-2 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </MenuLink>
                </li>
              ))}
            </ul>

            {/* Mobile Contact Info */}
            <div className="mt-6 space-y-4 border-t border-[#EAEAEA] pt-4">
              {headerData.contactInfo.map((info, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3"
                >
                  <span className="bg-primary text-white p-3 rounded-t-2xl">
                    <HugeiconsIcon
                      icon={info.icon}
                      size={24}
                      color="currentColor"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div>
                    <h3 className="font-medium text-sm">
                      {info.title}
                    </h3>
                    <p className="text-[#525766] text-xs">
                      {info.link ? (
                        <a href={info.link}>{info.description}</a>
                      ) : (
                        info.description
                      )}
                    </p>
                  </div>
                </div>
              ))}

              <Button
                asChild
                variant="primary"
                className="bg-primary hover:bg-[#10172E]"
              >
                <a
                  href={headerData.appointmentButton.link}
                  target="_blank"
                >
                  {headerData.appointmentButton.text}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
