import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from './Card';
import { getServices } from '../api';
import Link from 'next/link';
const CardSlider = ({ listItems }) => {
  const [subjects, setSubjects] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(async () => {
    //Need to useCallback --> try check console.log and see
    const res = await getServices();
    setSubjects(res);
  }, []);

  return (
    <section className="md:p-0 p-4 mt-20 mx-20 box-content overflow-hidden">
      <div class="">
        <h1 className="text-3xl font-bold mb-7 float-left">Popular Courses</h1>
        <Link href={'/ResultsPage'}><a class="float-right">View all courses</a></Link>
      </div>
      <div class="clear-left">
      <Carousel responsive={responsive}>
        {subjects
          .sort((a, b) => (a.students > b.students ? -1 : 1))
          .map((item) => {
            return (
              <Link href={'/services/' + item._id}>
                <a>
                  <Card
                    title={item.title}
                    img={item.img}
                    noStudents={item.students}
                  />
                </a>
              </Link>
            );
          })}
        </Carousel>
        </div>
    </section>
  );
};

export default CardSlider;
