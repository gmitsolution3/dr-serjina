// import { Menu, Phone, Clock, Hospital, Brain } from "lucide-react";
// import DoctorImage from "@/assets/doctorImage.png";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sideMenuData } from "@/data/sidemenu.data";
import {
  AiBrain01Icon,
  Clock01Icon,
  Hospital02Icon,
  Menu01Icon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function HeaderSideMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <HugeiconsIcon
          icon={Menu01Icon}
          size={24}
          color="currentColor"
          strokeWidth={1.5}
        />
      </SheetTrigger>

      <SheetContent className="bg-[#10172E] text-white border-l-0 overflow-y-auto">
        <SheetHeader>
          {/* Doctor Profile */}
          <div className="flex flex-col items-center text-center mt-8">
            {/* <img
              src={DoctorImage}
              alt={sideMenuData.doctor.name}
              className="w-28 h-36 object-cover rounded-xl shadow mb-4"
            /> */}

            <SheetTitle className="text-white text-2xl">
              {sideMenuData.doctor.name}
            </SheetTitle>

            <p className="mt-2 text-sm font-light text-gray-300">
              {sideMenuData.doctor.title}
            </p>
          </div>

          <SheetDescription>
            <div className="space-y-6 mt-8">
              {/* Centers */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Hospital02Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                  চেম্বার / হাসপাতাল
                </h3>

                <div className="space-y-3 whitespace-pre">
                  {sideMenuData.centers.map((center, idx) => (
                    <div key={idx}>
                      <p className="font-medium text-sm">
                        {center.name}
                      </p>
                      <p className="text-xs text-gray-300">
                        {center.address}
                      </p>
                      p
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <HugeiconsIcon
                    icon={TelephoneIcon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                  যোগাযোগ
                </h3>

                <div className="text-sm text-gray-300 flex flex-col gap-1">
                  {sideMenuData.phone.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              {/* Timing */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                  চেম্বার সময়
                </h3>

                <p className="text-sm text-gray-300">
                  {sideMenuData.timing}
                </p>
              </div>

              {/* Appointment */}
              <div>
                <h3 className="font-semibold text-white mb-3">
                  🕐 অ্যাপয়েন্টমেন্ট সময়
                </h3>
                <p className="text-sm text-gray-300">
                  {sideMenuData.appointment}
                </p>
              </div>

              {/* Online */}
              <div>
                <h3 className="font-semibold text-white mb-3">
                  💻 অনলাইন কন্সাল্টেন্সি
                </h3>
                <p className="text-sm text-gray-300">
                  {sideMenuData.appointment}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  {/* <Brain className="w-4 h-4 text-primary" /> */}
                  <HugeiconsIcon
                    icon={AiBrain01Icon}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                  বিশেষ দক্ষতা
                </h3>

                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  {sideMenuData.specialties.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-center text-sm text-gray-300 mb-2">
                  অ্যাপয়েন্টমেন্টের জন্য কল করুন
                </p>
                <p className="text-center font-semibold text-lg text-white">
                  {sideMenuData.phone[0]}
                </p>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
