// components/HeaderSideMenu.tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
            <img
              src="/doctorImage.png"
              alt="hello world"
              className="w-28 h-36 object-cover rounded-xl shadow mb-4"
            />
            <SheetTitle className="text-white text-2xl">
              ডাঃ এস. কে. সারজিনা আনোয়ার
            </SheetTitle>

            <p className="mt-2 text-sm font-light text-gray-300">
              শিশু রোগ বিশেষজ্ঞ ও শিশু নিউরোলজিস্ট
            </p>
          </div>

          <SheetDescription>
            <div className="space-y-6 mt-8">
              {/* Centers / Hospitals */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>
                    <HugeiconsIcon
                      icon={Hospital02Icon}
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  </span>
                  চেম্বার / হাসপাতাল
                </h3>

                <div className="space-y-3">
                  {/* Kurmitola Hospital */}
                  <div>
                    <p className="font-medium text-sm">
                      কুর্মিটোলা জেনারেল হাসপাতাল
                    </p>
                    <p className="text-xs text-gray-300">ঢাকা</p>
                  </div>

                  {/* York Hospital */}
                  <div>
                    <p className="font-medium text-sm">
                      ইয়র্ক হাসপাতাল
                    </p>
                    <p className="text-xs text-gray-300">
                      বাড়ি ১২ ও ১৩, সড়ক নংঃ ২২, ব্লকঃ K, বনানী, ঢাকা
                      ১২১৩।
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Numbers */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>
                    <HugeiconsIcon
                      icon={TelephoneIcon}
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  </span>
                  যোগাযোগ
                </h3>

                <div className="text-sm text-gray-300 flex flex-col gap-2">
                  <a
                    href="tel:+8801339511108"
                    className="hover:text-white transition-colors"
                  >
                    +৮৮০ ১৩৩৯-৫১১১০৮
                  </a>
                  <a
                    href="tel:+8801992222555"
                    className="hover:text-white transition-colors"
                  >
                    +৮৮০ ১৯৯২-২২২৫৫৫
                  </a>
                  <a
                    href="tel:+8801992222777"
                    className="hover:text-white transition-colors"
                  >
                    +৮৮০ ১৯৯২-২২২৭৭৭
                  </a>
                </div>
              </div>

              {/* Chamber Time */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>
                    <HugeiconsIcon
                      icon={Clock01Icon}
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  </span>
                  চেম্বার সময়
                </h3>

                <p className="text-sm text-gray-300">
                  শনিবার, সোম, বুধবার | সন্ধ্যা ৭টা – রাত ৯টা
                </p>
              </div>

              {/* Appointment Time */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>📅</span>
                  অ্যাপয়েন্টমেন্ট সময়
                </h3>
                <p className="text-sm text-gray-300">
                  সকাল ১১টা – রাত ১১টা
                </p>
              </div>

              {/* Online Consultation */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>💻</span>
                  অনলাইন কন্সাল্টেন্সি
                </h3>
                <p className="text-sm text-gray-300">
                  সকাল ১১টা – রাত ১১টা
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span>
                    <HugeiconsIcon
                      icon={AiBrain01Icon}
                      size={20}
                      strokeWidth={1.5}
                      className="text-primary"
                    />
                  </span>
                  বিশেষ দক্ষতা
                </h3>

                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-2">
                  <li>মৃগী ও খিঁচুনি রোগ</li>
                  <li>অটিজম ও এডিএইচডি</li>
                  <li>সেরিব্রাল পালসি</li>
                  <li>শিশু নিউরোলজি</li>
                  <li>ইইজি (EEG)</li>
                </ul>
              </div>

              {/* Call to Action */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-center text-sm text-gray-300 mb-2">
                  অ্যাপয়েন্টমেন্টের জন্য কল করুন
                </p>
                <a
                  href="tel:+8801339511108"
                  className="text-center font-semibold text-lg text-white hover:text-primary transition-colors block"
                >
                  +৮৮০ ১৩৩৯-৫১১১০৮
                </a>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
