type TestimonialProps = {
  text: string;
  user: string;
};
export default function Testimonial({ text, user }: TestimonialProps) {
  return (
    <div className='p-6 bg-gray-700 rounded-lg shadow-lg flex flex-col justify-between'>
      <p className='italic mb-4'>{text}</p>
      <p className='font-semibold'>- {user}</p>
    </div>
  );
}
