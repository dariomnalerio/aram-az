import { StaticImageData } from "next/image";
import Image from "next/image";

type FeatureProps = {
  title: string;
  description: string;
  alt: string;
  image: StaticImageData;
};

export function Feature({ title, description, image, alt }: FeatureProps) {
  return (
    <div className='p-4 bg-white rounded-lg shadow-lg'>
      <Image src={image} width={600} height={600} alt={alt} className='mx-auto mb-4 rounded-md' />
      <h3 className='text-2xl font-bold text-gray-600 mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}
