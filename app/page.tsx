import AppointmentBook from "@/components/AppointmentBook";
import Banner from "@/components/Banner";
import TreatmentSpecialities from "@/components/TreatmentSpecialities";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Banner />
      <AppointmentBook />
      <TreatmentSpecialities />
      <WhyChooseUs />
    </>
  );
}
