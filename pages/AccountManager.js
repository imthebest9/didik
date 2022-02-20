import React from 'react';
import AccountTitle from '../components/AccountTitleBar';
import AccManagerCourses from '../components/AccManagerCourses';
import AccManagerCour from '../components/AccManagerCour';
import AccManagerDashboard from '../components/AccManagerDashboard';
import NavBar from '../components/Header';

const AccountManager = () => {
  return (
    <div>
      <NavBar />
      <AccountTitle edit = {true} />
      <AccManagerCourses edit= {true} />
      <AccManagerCour edit={true}/>
      <AccManagerDashboard />
    </div>
  );
}

export default AccountManager;