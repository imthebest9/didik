import React, { useEffect } from 'react';
import { CircleLoading } from 'react-loadingg';
import { useSelector, useDispatch } from 'react-redux';
import { createDashboards, updatePayment } from '../api';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { discardCurrentPayment } from '../redux/payment';

const ProcessingPayment = () => {
  const currentPayment = useSelector((state) => state.currentPayment);
  const dispatch = useDispatch();
  const router = useRouter();
  const handlePostPayment = async () => {
    try {
      console.log('Changing payment type');
      const completedPayment = await updatePayment({
        paymentId: currentPayment._id,
      });
      if (completedPayment) {
        console.log(currentPayment);
        const dashboards = await createDashboards({
          courses: currentPayment.courses,
          student: nookies.get().userId,
        });
        dispatch(discardCurrentPayment());
        router.push('/');
      }
    } catch (err) {
      console.log(err);
      router.push('/');
    }
  };
  useEffect(() => {
    handlePostPayment();
  }, [currentPayment, router]);

  return (
    <div class="flex flex-col justify-center items-center h-screen">
      <CircleLoading />
      <h1 class="mt-20">Please wait a moment</h1>
    </div>
  );
};

export default ProcessingPayment;
