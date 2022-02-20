import Image from 'next/image';
import React from 'react';
import { AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai';
import { SiGoogleclassroom } from 'react-icons/si';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Link from 'next/link';

const ServiceCard = (props) => {
  const generateRandom = () => {
    const randomnum = Math.floor(Math.random() * (50 - 40) + 40) / 10;
    return randomnum;
  };

  // Generating for number of reviews, between 40 and 100
  const generateRandom2 = () => {
    const randomnum = Math.floor(Math.random() * (100 - 40) + 1);
    return randomnum;
  };

  return (
    <div className="max-w-xs mr-5 mt-5 rounded overflow-hidden shadow-lg">
      <Image
        src={props.image ? props.image : '/maths2.jpg'}
        width={390}
        height={150}
      />
      <div className="px-6 py-4 content-center">
        <div className="">
          <p className="p-font float-left">
            {props.tag ? ('[' + props.tag + ']') : ' '}
          </p>
          <p className="h3-font float-right">RM {props.price}</p>
        </div>
        <div className="h1-font font-bold text-xl mb-2 clear-left mt-10">
          {props.title}
        </div>
        <div className="mt-5 ">
          <div className="float-left">
            <AiOutlineCalendar size={30} />
          </div>
          <h1 className="h3-font inline-block ml-2 text-sm md:text-base float-left">
            {props.lessons} lessons
          </h1>
          <div className="float-left ml-5">
            <SiGoogleclassroom size={30} />
          </div>
          <h1 className="h3-font inline-block ml-2 text-sm md:text-base ">
            {props.mode}
          </h1>
        </div>
        <div className="mt-7 pb-10">
          <div className="float-left ">
            <AiOutlineStar size={30} />
          </div>
          <div className="h3-font float-left ml-3 font-bold text-xl">
            {generateRandom()}
          </div>
          <div className="p-font float-left ml-3 text-lg">
            ({generateRandom2()})
          </div>
          <div className="float-right mr-5 text-lg">
            <Link href={'/services/' + props.id}>
              <a>
                <BsFillArrowRightCircleFill size={40} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
