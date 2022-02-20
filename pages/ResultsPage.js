import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DropdownMenu from '../components/DropdownMenu';
import ServiceCard from '../components/ServiceCard';
import axios from 'axios';
import Button from '../components/Button';
import Link from 'next/link';
import { getServices } from '../api';
import NavBar from '../components/Header';
import { withRouter } from 'next/router';
import nookies from 'nookies';

const ResultsPage = ({ router }) => {
  const [services, setServices] = useState([]);

  const role = nookies.get().userRole;

  useEffect(async () => {
    const parent = router.query.parent;
    const child = router.query.child;
    const res = await getServices(parent, child);
    setServices(res);
  }, [router]);

  return (
    <>
    <NavBar />
    <div className="ml-3 md:ml-28 flex-col flex">
      
      <div className="mt-10 space-x-2 md:space-x-14 flex ">
        <DropdownMenu
          parent="Medium"
          child1="English"
          child2="Chinese"
          child3="Malay"
          child4="Others"
        />
        <DropdownMenu
          parent="Pricing"
          child1="<RM10"
          child2="RM10-RM50"
          child3="RM50-RM100"
          child4=">RM100"
        />

        <Button href={'/ResultsPage'} style={{ backgroundColor: '#00cc00' }}>
          Clear filter
        </Button>
        {role === 'Tutor' ? (
          <Link href="/AddServicePage">
            <Button href={'/AddServicePage'}>Add Service</Button>
          </Link>
        ) : (
          <></>
        )}
        {role === 'Tutor' ? (
          <Link href="/EditServicePage">
            <Button href={'/EditServicePage'}>Edit Service</Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <div className="mt-6 max-w-xs md:max-w-none flex flex-wrap ">
        {services.map((service) => (
          <ServiceCard
            id={service._id}
            tag={service.tag}
            price={service.pricing}
            title={service.title}
            lessons={service.lessons}
            mode={service.mode}
            image={service.img}
          />
        ))}
      </div>
      </div>
      </>
  );
};

export default withRouter(ResultsPage);
