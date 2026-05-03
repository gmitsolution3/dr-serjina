import {
  CallIcon,
  MapPinCheckIcon,
} from "@hugeicons/core-free-icons";

export const headerData = {
  logo: {
    text: "Dr. SK. SERJINA ANWAR",
    link: "/",
  },
  navItems: [
    { to: "/", name: "Home" },
    { to: "banner", name: "About" },
    { to: "book-appointment", name: "Book Appointment" },
    { to: "services", name: "Services" },
    { to: "gallery", name: "Gallery" },
    { to: "contact", name: "Contact" },
  ],
  contactInfo: [
    {
      icon: MapPinCheckIcon,
      title: "লোকেশন",
      description: [
        "ইয়র্ক হাসপাতাল, বনানী, ঢাকা ১২১৩",
        "কুর্মিটলা জেনারেল হসপিটাল, ঢাকা",
      ],
    },
    {
      icon: CallIcon,
      title: "সিরিয়ালের জন্য",
      description: ["+8801339-511108", "+8801992222555"],
      link: "tel:+8801339511108",
    },
  ],
  appointmentButton: {
    text: "অ্যাপয়েন্টমেন্ট বুক করুন",
    link: "https://forms.gle/STorhY5dkm5qKefP7",
  },
};
