import { DocumentIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { Accordion, AccordionBody, AccordionHeader, Card } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { supportIcon } from "../../assets/icons";
import { staggerFadeIn2 } from "../../assets/gsap";
const FAQs = () => {
  staggerFadeIn2(".gsapFAQs");
  const [open, setOpen] = useState(null);

  const handleOpen = (index) => {
    setOpen(open === index ? null : index);
  };
  const faqs = [
    {
      question: "Do you offer a startup bonus?",
      answer: "Yes, upon registration, you receive a minimum of $5 as a startup bonus.",
    },
    {
      question: "Can I upgrade my plan after choosing a lower one?",
      answer: "Yes, you can upgrade your plan after each 24-hour trading cycle is completed.",
    },
    {
      question: "Do I earn a bonus for referrals?",
      answer:
        "Yes, you receive a $5 referral bonus for each person who registers and funds their account using your referral link.",
    },
    {
      question: "Can I withdraw my deposit?",
      answer: "Yes, you can withdraw your deposit once the trading cycle is completed.",
    },
    {
      question: "What is the deposit limit?",
      answer: "The minimum deposit is $50, while the maximum deposit per plan is $1000.",
    },
    {
      question: "How is my money secured and guaranteed to generate profit?",
      answer:
        "Our advanced trading algorithm manages your deposit, ensuring a guaranteed ROI at the end of each trading window.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer:
        "Withdrawals are available once your profit or ROI reaches the scheduled time in your selected payment package.",
    },
  ];

  const features = [
    {
      icon: <QuestionMarkCircleIcon className='w-7 h-7' />,
      title: "FAQs",
      description:
        "Explore our Frequently Asked Questions to gain key insights into how our platform operates.",
    },
    {
      icon: <DocumentIcon className='w-7 h-7' />,
      title: "Guides",
      description:
        "Step-by-step guides to help you navigate and maximize your experience on our platform.",
    },
    {
      icon: <span className='w-7 h-7'>{supportIcon}</span>,
      title: "Support Request",
      description: "Get 24/7 support—we’re here to assist you as you grow your earnings.",
    },
  ];

  return (
    <section className='py-16 bg-primary-default' id='FAQs'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12 gsapFAQs'>
          <h4 className='text-2xl font-semibold mb-4 text-white'>Find the help you need!</h4>
          <p className='text-text-light max-w-2xl mx-auto'>
            Find all the help you need with our amiable customer service. They are always ready and
            available to serve you better.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <Card
              key={index}
              variant='gradient'
              className='p-6 text-center shadow-md gsapFAQs bg-primary-light'>
              <div className='flex flex-row justify-center gap-4'>
                <div className='text-white mb-4 text-4xl'>{feature.icon}</div>
                <h5 className='text-lg font-medium text-white'>{feature.title}</h5>
              </div>
              <p className='text-text-light mt-3'>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className='container mx-auto px-4 mt-16 gsapFAQs'>
        <div className='text-center mb-12'>
          <h4 className='text-2xl font-semibold mb-4'>Frequently Asked Questions</h4>
          <p className='text-text-light max-w-2xl mx-auto'>
            Please review the information below to ensure a thorough understanding.
          </p>
        </div>

        {/* Accordion */}
        <div className='w-full'>
          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <Accordion key={index} open={open === index} className='border-0 rounded-lg gsapFAQs'>
                <AccordionHeader onClick={() => handleOpen(index)} className='p-4 bg-accent'>
                  <h6 className='text-lg font-medium text-white'>{faq.question}</h6>
                </AccordionHeader>
                <AccordionBody className='p-4 text-text-light'>{faq.answer}</AccordionBody>
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      {/* Sign-Up Section */}
      <section className='py-12 bg-primary-default gsapFAQs'>
        <div className='container mx-auto px-4'>
          <div className='p-8 bg-primary-dark text-white rounded-lg'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full md:w-8/12 mb-8 md:mb-0'>
                <h4 className='text-2xl font-bold mb-4'>The Better Way to Trade & Invest</h4>
                <p>
                  Join over 1.3 million customers who have achieved their financial goals by trading
                  and investing with ease.
                </p>
              </div>
              <div className='w-full md:w-4/12 text-center md:text-right'>
                <Link
                  to='./auth/register'
                  className='bg-white text-accent font-medium px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition'>
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FAQs;
