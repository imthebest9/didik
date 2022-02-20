import React from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PayingForm from '../components/Cart/PayingForm';
import nookies from 'nookies';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const Paying = () => {
  const currentPayment = useSelector((state) => state.currentPayment);

  const options = {
    // passing the client secret obtained in step 2
    clientSecret: currentPayment?.paymentLink,
    // Fully customizable with appearance API.
    appearance: { theme: 'night', labels: 'floating' },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PayingForm />
    </Elements>
  );
};

export default Paying;
