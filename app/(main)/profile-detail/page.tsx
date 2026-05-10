import { getProfileData } from "@/services/getProfileData";
import {
  AiBrain01Icon,
  Clock01Icon,
  Hospital02Icon,
  Mortarboard02Icon,
  StethoscopeIcon,
  TelephoneIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function ProfileDetail() {
  const res = await getProfileData();
  const profileData = res?.data || {};

  const contactNumbers = profileData?.contactNumbers || [];
  const chambers = profileData?.chamber || [];
  const qualifications = profileData?.educationalQualification || [];
  const specialTrainings = profileData?.specialTrainings || [];
  const treatmentAndExperties =
    profileData?.treatmentAndExperties || [];

  const chunkSize = 10;
  const maxColumns = 5;

  const columns = [];

  for (
    let i = 0;
    i < treatmentAndExperties.length && columns.length < maxColumns;
    i += chunkSize
  ) {
    columns.push(treatmentAndExperties.slice(i, i + chunkSize));
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white rounded-2xl shadow-md p-8">
          {/* Doctor Image */}
          <div className="flex justify-center">
            <img
              src={profileData?.profileImage || "/doctorImage.png"}
              alt={
                profileData?.name?.bangla || "ডাঃ শেখ সারজিনা আনোয়ার"
              }
              className="w-64 h-80 object-cover rounded-2xl shadow"
            />
          </div>

          {/* Basic Info */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-800">
              {profileData?.name?.bangla ||
                "ডাঃ এস. কে. সারজিনা আনোয়ার"}
            </h1>
            <p className="text-lg text-gray-600 mt-1">
              {profileData?.name?.english || "Dr. SK. Serjina Anwar"}
            </p>

            <p className="mt-3 text-primary font-medium">
              {profileData?.specializedIn ||
                "শিশু রোগ বিশেষজ্ঞ ও শিশু নিউরোলজিস্ট"}
            </p>

            <div className="mt-4 space-y-2 text-gray-700">
              {chambers.map((chamber: any) => (
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={Hospital02Icon}
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                  <span>
                    {chamber.designation}, {chamber.name},{" "}
                    {chamber.location}
                  </span>
                </div>
              ))}

              {/* Phone Numbers */}
              {contactNumbers.length > 0 && (
                <div className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={TelephoneIcon}
                    size={20}
                    strokeWidth={1.5}
                    className="text-primary"
                  />
                  <span>{contactNumbers[0]?.number}</span>
                </div>
              )}

              <div className="flex items-start gap-2">
                <HugeiconsIcon
                  icon={Clock01Icon}
                  size={20}
                  strokeWidth={1.5}
                  className="text-primary mt-1"
                />
                <div className="text-sm leading-relaxed">
                  {profileData?.chamberTime && (
                    <p>
                      <strong>চেম্বারে রোগী দেখার সময়:</strong>
                      <br />
                      {profileData.chamberTime}
                    </p>
                  )}

                  {profileData?.onlineConsultancyTime && (
                    <p className="mt-2">
                      <strong>অনলাইন ভিডিও কনসালটেশন:</strong>
                      <br />
                      {profileData.onlineConsultancyTime}
                    </p>
                  )}

                  {profileData?.appointmentTime && (
                    <p className="mt-2">
                      <strong>অ্যাপয়েন্টমেন্ট সিরিয়াল:</strong>
                      <br />
                      {profileData.appointmentTime}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <HugeiconsIcon
              icon={StethoscopeIcon}
              size={24}
              strokeWidth={1.5}
              className="text-primary"
            />
            ডাক্তারের পরিচিতি
          </h2>

          <p className="text-gray-700 leading-relaxed">
            {profileData?.longDescription ||
              `ডাঃ শেখ সারজিনা আনোয়ার একজন অভিজ্ঞ শিশু রোগ বিশেষজ্ঞ ও
              শিশু নিউরোলজিস্ট। তিনি শিশুদের জটিল স্নায়বিক ও
              নিউরোডেভেলপমেন্টাল সমস্যার নির্ভুল নির্ণয় ও চিকিৎসায়
              বিশেষভাবে দক্ষ। নবজাতক থেকে শুরু করে শিশু ও কিশোরদের জন্য
              তিনি আধুনিক, প্রমাণভিত্তিক এবং পরিবারকেন্দ্রিক চিকিৎসা
              সেবা প্রদান করে থাকেন।`}
          </p>
        </div>

        {/* Qualifications */}
        {qualifications.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HugeiconsIcon
                icon={Mortarboard02Icon}
                size={24}
                strokeWidth={1.5}
                className="text-primary"
              />
              শিক্ষাগত যোগ্যতা
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {qualifications.map(
                (qualification: string, index: number) => (
                  <li key={index}>{qualification}</li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Special Training */}
        {specialTrainings.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <HugeiconsIcon
                icon={AiBrain01Icon}
                size={24}
                strokeWidth={1.5}
                className="text-primary"
              />
              বিশেষ প্রশিক্ষণ
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {specialTrainings.map(
                (training: string, index: number) => (
                  <li key={index}>{training}</li>
                ),
              )}
            </ul>
          </div>
        )}

        {/* Services */}
        {treatmentAndExperties.length > 0 && (
          <div className="mt-10 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">
              চিকিৎসা সেবা ও বিশেষ দক্ষতা
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-gray-700">
              {columns.map((column, columnIndex) => (
                <ul
                  key={columnIndex}
                  className="list-disc pl-6 space-y-2"
                >
                  {column.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-10 bg-primary text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-semibold mb-2">
            অ্যাপয়েন্টমেন্ট বুক করুন
          </h3>
          <p className="mb-4">
            আপনার সন্তানের স্নায়বিক ও বিকাশজনিত সমস্যার জন্য
            নির্ভরযোগ্য ও বিশেষায়িত চিকিৎসা সেবা।
          </p>
          {contactNumbers.length > 0 && (
            <p className="font-semibold text-lg">
              📞 {contactNumbers[0]?.number}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
