import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ManagerCard from './ManagerCard';
import { receiveUser } from "../api";
import nookies from 'nookies';
import Link from 'next/link';

const AccManagerCourses = (props) => {
  const [service, setService] = useState([]);
  const [hide, setHide] = useState();
  const [show, setShow] = useState(true);

  const userId = nookies.get().userId;
  const userRole = nookies.get().userRole;

  useEffect(async() => {
    if(userRole == "Student") setHide(true);
    else setHide(false);

    const res = await receiveUser(userId);
    setService(res.dashboard);

    if(service == null) setShow(false);
  }, [service]);

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

  return (
    <div>
      {hide?<div className='border-b-4 mx-8'>
          <div className='flex justify-between'>
            <h1 className='text-3xl font-bold mt-5'>
              Dashboard
            </h1>
            <Link href={"/ResultsPage"}>
              <button className="my-4 mr-2 px-2 bg-yellow-200 text-black font-medium text-3xl leading-tight rounded-full shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  +
              </button>
            </Link>
          </div>
          {show?<div className="md:p-0 p-4 mt-4 mx-auto max-w-screen-lg box-content overflow-hidden">
          <Carousel responsive={responsive} className='mb-6'>
            {service?.map((item) => {
              return <ManagerCard title={item.course.title} img={item.course.img} student = {props.edit} dash_ID = {item._id} />;
            })}
          </Carousel>
        </div>:null}
      </div>:null}
    </div>
    
  )
}

export default AccManagerCourses
