import AppointmentBook from "@/components/AppointmentBook";
import Banner from "@/components/Banner";
import BookingProcess from "@/components/BookingProcess";
import CallToAction from "@/components/CallToAction";
import SpecializedServices from "@/components/SpecializedServices";
import Stats from "@/components/Stats";
import TreatmentSpecialities from "@/components/TreatmentSpecialities";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Banner />
      <AppointmentBook />
      <TreatmentSpecialities />
      <WhyChooseUs />
      <Stats />
      <SpecializedServices />
      <CallToAction />
      <BookingProcess />
    </>
  );
}
