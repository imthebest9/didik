import React, { useState, useEffect, useCallback } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ManagerCard from './ManagerCard';
import { receiveUser } from "../api";
import nookies from 'nookies';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AccManagerCour = (props) => {
  const [service, setService] = useState([]);
  const [hide, setHide] = useState();
  const [show, setShow] = useState(props.edit);
  const [tunjuk, setTunjuk] = useState(true);
  const [sembunyi, setSembunyi] = useState(null);

  const userId = nookies.get().userId;
  const userRole = nookies.get().userRole;
  const router = useRouter();
  
  const display =  async() =>{
    if(userRole == "Tutor") setHide(true);
    else if(!show){setService(props.profile.courses); setHide(true);}
    else setHide(false);
    setSembunyi("2");
    const res = await receiveUser(userId);
    setService(res.courses);
    
    if(service == null)setTunjuk(false);
  }

  useEffect(() => {
    display();
  }, [service]);

  console.log(hide + "wow");
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
              Courses
            </h1>
            {show?<Link href={"/AddServicePage"}>
              <button className="my-4 mr-2 px-2 bg-yellow-200 text-black font-medium text-3xl leading-tight rounded-full shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  +
              </button>
            </Link>:null}
          </div>
          {tunjuk?<div className="md:p-0 p-4 mt-4 mx-auto max-w-screen-lg box-content overflow-hidden">
          <Carousel responsive={responsive} className='mb-6'>
            {service.map((item) => {
              return <ManagerCard title={item.title} img={item.img} student = {props.edit} />;
            })}
          </Carousel>
        </div>:null}
      </div>:null}
    </div>
  )
}

export default AccManagerCour
