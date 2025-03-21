import { Carousel, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Testimony1, Testimony2, Testimony3 } from "../../../assets/utilities";
import { staggerFadeIn } from "../../../assets/gsap";

const testimonials = [
  {
    id: 1,
    name: "Ethan Brooks",
    role: "Graphic Designer",
    image: Testimony1,
    review:
      "This platform has revolutionized how I manage my creative projects. The simplicity and efficiency make my workflow so much easier.",
  },
  {
    id: 2,
    name: "Mitchell Hayes",
    role: "Operations Manager",
    image: Testimony2,
    review:
      "Working with this team has been a seamless experience. Their tools have boosted our productivity and helped us stay ahead of deadlines.",
  },
  {
    id: 3,
    name: "Sophia Carter",
    role: "Marketing Specialist",
    image: Testimony3,
    review:
      "I’ve never used a platform this intuitive before. It’s helped me streamline my campaigns and achieve better results with less effort.",
  },
];

const Testimonials = () => {
  staggerFadeIn(".gsapTestimony");
  return (
    <section className='my-5 bg-inherit overflow-hidden min-h-[75dvh] md:min-h-[50dvh]'>
      <div className='container mt-24 mx-auto'>
        <div className='text-center'>
          <div className='mb-8 gsapTestimony'>
            <Typography variant='h4' color='text'>
              What our Customers say!
            </Typography>
            <Typography
              variant='paragraph'
              className='text-text-light text-center max-w-xl mx-auto'>
              You can take our word for it, here&apos;s what some of our clients have to say about
              us.
            </Typography>
          </div>
        </div>

        <Carousel autoplay={true} loop={true} autoplayDelay={3000} className='mt-10 gsapTestimony'>
          {testimonials.map(({ id, name, role, image, review }) => (
            <div key={id} className='flex justify-center items-center h-[400px]'>
              <Card className='m-2 shadow-lg' variant='gradient' color='gray'>
                <CardHeader floated={false} className='mx-auto'>
                  <img src={image} alt={name} className='rounded-none object-cover w-32 h-32' />
                </CardHeader>
                <CardBody className='text-center'>
                  <Typography variant='h6' className='text-text-light'>
                    {name}
                    <small className='block text-sm text-text-light'>{role}</small>
                  </Typography>
                  <div className='flex mb-2 justify-self-center'>
                    {Array(5)
                      .fill("")
                      .map((_, index) => (
                        <span key={index} className='text-yellow-500 text-lg'>
                          ★
                        </span>
                      ))}
                  </div>
                  <Typography className='text-text-light italic'>{`"${review}"`}</Typography>
                </CardBody>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
