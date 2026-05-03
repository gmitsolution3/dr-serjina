export default function SpecializedServices() {
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
            {/* Service 1 - Child Diagnosis */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/child-diagnosis-two.jpg"
                  alt="Child Diagnosis"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  চাইল্ড ডায়াগনোসিস
                </h3>
              </div>
            </div>

            {/* Service 2 - Pediatric Neurology */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/pediatric.jpg"
                  alt="Pediatric Neurology"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  পেডিয়েট্রিক নিউরোলজি
                </h3>
              </div>
            </div>

            {/* Service 3 - Neuro Physiologist & EEG */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/neuro-development.jpg"
                  alt="Neuro Physiologist"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center whitespace-pre-line">
                  নিউরো ফিজিওলজিস্ট {"\n"} electroencephalogram (EEG)
                </h3>
              </div>
            </div>

            {/* Service 4 - Neuro Development */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/neuro_one.jpg"
                  alt="Neuro Development"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  নিউরো ডেভেলপমেন্ট
                </h3>
              </div>
            </div>

            {/* Service 5 - Autism Consultation */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/autism.jpg"
                  alt="Autism Consultation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  অটিজম কন্সাল্টেন্সি
                </h3>
              </div>
            </div>

            {/* Service 6 - Epilepsy & Seizure Disorders */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/mrigi-rog.webp"
                  alt="Epilepsy and Seizure Disorders"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  মৃগী ও খিঁচুনি রোগ
                </h3>
              </div>
            </div>

            {/* Service 7 - Neurodevelopmental Disorders */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/snayo-bikash.jpg"
                  alt="Neurodevelopmental Disorders"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  স্নায়ু-বিকাশগত রোগ
                </h3>
              </div>
            </div>

            {/* Service 8 - Neuromuscular Disorders */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/snayo-peshi.png"
                  alt="Neuromuscular Disorders"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  স্নায়ু-পেশী রোগ
                </h3>
              </div>
            </div>

            {/* Service 9 - Cerebral Palsy Management */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/seribal-plesy.jpg"
                  alt="Cerebral Palsy Management"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  সেরিব্রাল পালসি ব্যবস্থাপনা
                </h3>
              </div>
            </div>

            {/* Service 10 - Headache & Migraine (Children) */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/child-migrane.webp"
                  alt="Headache and Migraine in Children"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  মাথাব্যথা ও মাইগ্রেন (শিশুদের)
                </h3>
              </div>
            </div>

            {/* Service 11 - Neurogenetic & Metabolic Disorders */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/snayo-bipak.webp"
                  alt="Neurogenetic and Metabolic Disorders"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center whitespace-pre-line">
                  স্নায়ু-জিনগত ও {"\n"} বিপাকীয় রোগ
                </h3>
              </div>
            </div>

            {/* Service 12 - Neuroinfection & Inflammatory Diseases */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/snayo-bipak.webp"
                  alt="Neuroinfection and Inflammatory Diseases"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  স্নায়ু-সংক্রমণ ও প্রদাহজনিত রোগ
                </h3>
              </div>
            </div>

            {/* Service 13 - Neonatal Neurology */}
            <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                <img
                  src="/snayo-bidda.webp"
                  alt="Neonatal Neurology"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 text-center">
                  নবজাতকের স্নায়ুবিদ্যা
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
