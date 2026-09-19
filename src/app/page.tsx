import { BatteryFinder } from '../components/BatteryFinder';
import { DeliveryCheck } from '../components/DeliveryCheck';
import Hero from '../sections/Hero';
import Batteries from '../sections/Batteries';
import Services from '../sections/Services';
import Brands from '../sections/Brands';
import About from '../sections/About';
import Faq from '../sections/Faq';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Batteries />
      <BatteryFinder />
      <Services />
      <Brands />
      <DeliveryCheck />
      <About />
      <Faq />
      <Contact />
    </>
  );
}
