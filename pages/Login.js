import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword, 
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getUser } from '../api';
import LoginForm from '../components/Forms/Login';
import SignUpForm from '../components/Forms/SignUp';
import Google from '../components/SocialButtons/Google';

const Login = () => {
  const [registering, setRegistering] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const user = registering
        ? await createUserWithEmailAndPassword(auth, data.email, data.password)
        : await signInWithEmailAndPassword(auth, data.email, data.password);
      if (user) {
        console.log(user);
        const userDetails = await getUser(user.user.uid);
        if (userDetails.length === 0) {
          router.push('/AddUser');
          return;
        }

        toast.success('Logged in Successfully');
        registering ? router.push('/AddUser') : router.push('/');
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 h-screen">
      <div style={{ backgroundColor: '#D4ECDD' }}>
        <img className='pt-16' src="/images/loginCard.svg" />
      </div>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-xl">Sign in to Didik</h1>
        {registering ? (
          <SignUpForm
            onSubmit={onSubmit}
            onClick={() => setRegistering(false)}
          />
        ) : (
          <LoginForm onSubmit={onSubmit} onClick={() => setRegistering(true)} />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
