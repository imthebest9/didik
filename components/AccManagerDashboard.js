import React, {useState, useEffect} from 'react';
import AccDropDown from './AccDropDown';
import nookies from 'nookies';
import { receiveUser } from '../api';

const AccManagerDashboard = () => {
  const [course, setCourse] = useState([]);
  const userId = nookies.get().userId;
  const [hide, setHide] = useState();

  const userRole = nookies.get().userRole;
  
  useEffect(async () => {
    const res = await receiveUser(userId);
    setCourse(res.dashboard);
    if(userRole == "Student") setHide(false);
    else setHide(true);
}, [hide]);

  return(
    <div>
      {hide?<section className='border-b-4 mx-8 mb-5'>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-bold mb-7 mt-5'>
              Dashboard
          </h1>
        </div>
        {course?.map((item) =>{
          return <AccDropDown
          parent= {item.course.title}
          firstName = {item.student.firstName}
          lastName = {item.student.lastName}
          emailAddress = {item.student.emailAddress}
          dash_ID = {item._id}
          />;
        })}
       </section>:null}
    </div>
  )
};

export default AccManagerDashboard;
