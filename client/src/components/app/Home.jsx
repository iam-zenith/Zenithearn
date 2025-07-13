import Features from "./subComponents/Features";
import Hero from "./subComponents/Hero";
import Services from "./subComponents/Services";
import Testimonial from "./subComponents/Testimonial";
import FAQs from "./FAQs";
import Always from "./Always";
import MarketData from "./subComponents/Tradeview/MarketData";
import Popups from "../layout/Popups";

const Home = () => {
  return (
    <section className='overflow-x-hidden'>
      <Popups />
      <Hero />
      <Features />
      <Services />
      <Always />
      <Testimonial />
      <MarketData />
      <FAQs />
    </section>
  );
};

export default Home;
