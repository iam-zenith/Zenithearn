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
      question: "Is there a startup bonus?",
      answer: "Yes, when you register, you get a $5 startup bonus.",
    },
    {
      question: "Can I upgrade my plan after selecting a lower plan?",
      answer:
        "Yes, you will be able to upgrade your plan after each completed trading cycle of 24 hours.",
    },
    {
      question: "Will I get a bonus for referring?",
      answer:
        "Yes, you get a referral bonus of $5 for every person who registers and funds their account through your referral link.",
    },
    {
      question: "Will I be able to withdraw my deposit?",
      answer: "Yes, you can withdraw your deposit after the trading cycle is complete.",
    },
    {
      question: "How much can I deposit?",
      answer: "The minimum deposit is $50, and the maximum deposit per plan is $1000.",
    },
    {
      question: "How can I guarantee my money is secure and will generate profit?",
      answer:
        "When you subscribe to a plan, our professional algorithm trades with your deposit and guarantees ROI on every completed trading window.",
    },
    {
      question: "How can I withdraw?",
      answer:
        "You can only withdraw once your profit or ROI reaches the stipulated time scheduled on your payment package.",
    },
  ];

  const features = [
    {
      icon: <QuestionMarkCircleIcon className='w-7 h-7' />,
      title: "FAQs",
      description:
        "Our Frequently Asked Questions provide you with important know-how on how our platform works interactively.",
    },
    {
      icon: <DocumentIcon className='w-7 h-7' />,
      title: "Guides",
      description:
        "Our guides walk you through every step to ensure a smooth interaction with our platform.",
    },
    {
      icon: <span className='w-7 h-7'>{supportIcon}</span>,
      title: "Support Request",
      description:
        "Request support 24/7, and we’ll be there to assist you while you grow your income.",
    },
  ];

  return (
    <section className='py-16 bg-primary-default' id='FAQs'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12 gsapFAQs'>
          <h4 className='text-2xl font-semibold mb-4'>Find the help you need!</h4>
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
              color='gray'
              className='p-6 text-center shadow-md gsapFAQs'>
              <div className='flex flex-row justify-center gap-4'>
                <div className='text-text-light mb-4 text-4xl'>{feature.icon}</div>
                <h5 className='text-lg font-medium text-text-light'>{feature.title}</h5>
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
          <div className='p-8 bg-accent text-white rounded-lg'>
            <div className='flex flex-wrap items-center'>
              <div className='w-full md:w-8/12 mb-8 md:mb-0'>
                <h4 className='text-2xl font-bold mb-4'>The Better Way to Trade & Invest</h4>
                <p>
                  Join over 2 million customers who have achieved their financial goals by trading
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
