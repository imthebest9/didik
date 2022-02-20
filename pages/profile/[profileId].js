import React, { useEffect, useState } from 'react';
import AccManagerCour from '../../components/AccManagerCour';
import AccountTitleBar from '../../components/AccountTitleBar';
import { useRouter } from 'next/router';
import { receiveUser } from '../../api';
import nookies from 'nookies';
import NavBar from '../../components/Header';

function Profile (props){
  const router = useRouter();
  const [profile, setProfile] = useState({});

  const profileId = router.query.profileId;
  useEffect(async () => {
    const res = await receiveUser(profileId);
    setProfile(res);
  }, [router]);
  
  return(
      <div>
        <NavBar />
        <AccountTitleBar edit = {false} profile={profile}/>
        {/* {profile.role === 'Tutor'?<AccManagerCour edit = {false} profile={profile}/>:<></>} */}
      </div>
  )
};

export default Profile;
