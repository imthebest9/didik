import { getAuth } from 'firebase/auth';
import Router from 'next/router';
import nookies from 'nookies';
import { getUser } from '../api';

export const signOut = async () => {
  try {
    //We need to clear our cookies
    await getAuth().signOut();
    nookies.set(undefined, 'token', '', {});
    Router.push('/');
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async () => {
  try {
    const token = await getAuth().currentUser.getIdToken();
    return token;
  } catch (err) {
    console.log(err);
  }
};
