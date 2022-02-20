import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { getAuth } from 'firebase/auth';
import { getUser, setAuthToken } from './api';
import initFirebase from './firebase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  initFirebase();
  const [user, setUser] = useState();
  const auth = getAuth();
  const router = useRouter();

  useEffect(async () => {
    try {
      return auth.onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          nookies.set(undefined, 'token', '', {});
          nookies.set(undefined, 'uid', '', {});
          nookies.set(undefined, 'userId', '', {});
          nookies.set(undefined, 'userRole', '', {});
          return;
        }
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, 'token', token, {});
        nookies.set(undefined, 'uid', user.uid, {});
        setAuthToken(token);

        const userDetails = await getUser(user.uid);
       
        if (userDetails.length === 0) router.push('/AddUser');
        else {
          nookies.set(undefined, 'userId', userDetails[0]._id, {}),
            nookies.set(undefined, 'userRole', userDetails[0].role, {});
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
