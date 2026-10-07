import HomeStyles from "../components/home/HomeStyles";
import Hero from "../components/home/Hero";
import BusinessSplit from "../components/home/BusinessSplit";
import Services from "../components/home/Services";
import Processes from "../components/home/Processes";
import RecentWork from "../components/home/RecentWork";
import Industries from "../components/home/Industries";
import WhyChoose from "../components/home/WhyChoose";
import CtaBand from "../components/home/CtaBand";

export default function Home() {
  return (
    <main className="home">
      <HomeStyles />
      <Hero />
      <BusinessSplit />
      <Services />
      <Processes />
      <RecentWork />
      <Industries />
      <WhyChoose />
      <CtaBand />
    </main>
  );
}