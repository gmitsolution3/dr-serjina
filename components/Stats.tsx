import {
  InjectionIcon,
  StarAward02Icon,
  UserCheck01Icon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Stats() {
  return (
    <section
      id="stats"
      className="py-12 md:py-16 lg:py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-0">
        {/* Stats Section */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Stat 1 - Patients Served */}
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex justify-center">
                <div className="scale-75 md:scale-90 lg:scale-100">
                  <HugeiconsIcon
                    icon={UserGroup03Icon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  ৫০০০<span className="text-primary">+</span>
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-snug">
                  রোগীকে সেবা প্রদান
                </p>
              </div>
            </div>

            {/* Stat 2 - Years of Experience */}
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex justify-center">
                <div className="scale-75 md:scale-90 lg:scale-100">
                  <HugeiconsIcon
                    icon={StarAward02Icon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  ১৮<span className="text-primary">+</span>
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-snug">
                  বছরের অভিজ্ঞতা
                </p>
              </div>
            </div>

            {/* Stat 3 - Complex Solutions */}
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex justify-center">
                <div className="scale-75 md:scale-90 lg:scale-100">
                  <HugeiconsIcon
                    icon={InjectionIcon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  ১০০০<span className="text-primary">+</span>
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-snug">
                  জটিল সমস্যা সমাধান
                </p>
              </div>
            </div>

            {/* Stat 4 - Professional Training */}
            <div className="text-center space-y-3 md:space-y-4">
              <div className="flex justify-center">
                <div className="scale-75 md:scale-90 lg:scale-100">
                  <HugeiconsIcon
                    icon={UserCheck01Icon}
                    size={48}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  ২২<span className="text-primary">+</span>
                </h3>
                <p className="text-gray-600 text-xs md:text-sm lg:text-base leading-snug">
                  প্রফেশনাল ট্রেনিং
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
