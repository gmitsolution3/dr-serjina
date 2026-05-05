import { getServicesData } from "@/services/getServices";
import { IProfile } from "@/types";

export default async function SpecializedServices() {
  const res = await getServicesData();

  const serviceList = res?.data?.serviceList || [];

  console.log(serviceList);

  // If no services, show empty state
  if (serviceList.length === 0) {
    return (
      <section
        id="specialized-services"
        className="py-12 md:py-16 lg:py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 lg:px-0">
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              <div>
                <p
                  className="font-medium mb-2 text-sm md:text-base"
                  style={{ color: "#4285f4" }}
                >
                  পেডিয়াট্রিক ও নিউরোলজি আধুনিক চিকিৎসা
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  স্পেশালাইজড সার্ভিসেস
                </h2>
              </div>
            </div>

            {/* Empty State Message */}
            <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔧</div>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  সার্ভিস লিস্ট আপডেট হচ্ছে
                </h3>
                <p className="text-gray-600">
                  আমাদের স্পেশালাইজড সার্ভিসেস লিস্ট শীঘ্রই যোগ করা হবে।
                  <br />
                  আপডেট থাকার জন্য ধন্যবাদ।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="specialized-services"
      className="py-12 md:py-16 lg:py-20 bg-gray-50"
    >
      <div className="container mx-auto px-4 lg:px-0">
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div>
              <p
                className="font-medium mb-2 text-sm md:text-base"
                style={{ color: "#4285f4" }}
              >
                পেডিয়াট্রিক ও নিউরোলজি আধুনিক চিকিৎসা
              </p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                স্পেশালাইজড সার্ভিসেস
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {serviceList.map((service: any, index: number) => (
              <div
                key={service._id || index}
                className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                  <img
                    src={service.imageUrl || "/placeholder.jpg"}
                    alt={service.name || "Service"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}