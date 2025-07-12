import { Card, CardBody, Typography } from "@material-tailwind/react";
import { PhoneIllustration } from "../../../assets/utilities";
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { supportIcon } from "../../../assets/icons";
import { fadeIn, staggerFadeIn2 } from "../../../assets/gsap";

const features = [
  {
    icon: <ArrowTrendingUpIcon className='w-5 h-5' />,
    title: "Robust Trading Platforms",
    description: "Choose from a variety of platforms designed to meet every trader’s unique needs.",
  },
  {
    icon: <CreditCardIcon className='w-5 h-5' />,
    title: "High Leverage",
    description:
      "Boost your investments with competitive, low-spread options for increased profits.",
  },
  {
    icon: <BoltIcon className='w-5 h-5' />,
    title: "Rapid Execution",
    description: "Enjoy ultra-fast trading software that minimizes slippage during your trades.",
  },
  {
    icon: <ShieldCheckIcon className='w-5 h-5' />,
    title: "Top-notch Security",
    description:
      "Our advanced security measures ensure your account remains safeguarded at all times.",
  },
  {
    icon: <span className='w-5 h-5 scale-125'>{supportIcon}</span>,
    title: "24/7 Live Chat Support",
    description: "Connect anytime with our round-the-clock support and on-demand market analysts.",
  },
];

const ServicesSection = () => {
  staggerFadeIn2(".gsapServices");
  fadeIn(".gsapService");
  return (
    <section className='overflow-hidden bg-primary-default min-h-screen'>
      <div className='container mx-auto px-4 py-20'>
        <div className='text-center mb-8 gsapService'>
          <Typography variant='h4' className='mb-4 text-white'>
            Explore Our Services
          </Typography>
          <Typography variant='paragraph' className='text-text-light max-w-xl mx-auto'>
            Our mission is to ensure you have a seamless and rewarding trading experience!
          </Typography>
        </div>

        <div className='flex flex-wrap justify-center items-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-3xl'>
            {features.map((feature, index) => (
              <Card
                key={index}
                className='p-4 shadow-md gsapServices bg-primary-light'
                variant='gradient'>
                <CardBody className='flex items-start'>
                  <div className='flex-shrink-0 mr-4'>
                    <div className='w-12 h-12 flex items-center justify-center bg-accent rounded-full text-text-light'>
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <Typography variant='h6' className='mb-2 text-white'>
                      {feature.title}
                    </Typography>
                    <Typography variant='paragraph' className='text-text-light'>
                      {feature.description}
                    </Typography>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
          <div className='mt-8 lg:mt-0 lg:ml-8 gsapServices'>
            <img src={PhoneIllustration} alt='Phone App' className='max-w-xs lg:max-w-md mx-auto' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
