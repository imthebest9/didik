import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CartItem from '../components/Cart/CartItem';
import { getPaymentTopay } from '../api';
import Loading from '../components/Loading';
import Link from 'next/link';
import Button from '../components/Button/Button';
import { setCurrentPayment } from '../redux/payment';

const PaymentSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [payments, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const paymentId = router.query.paymentId;
  const getPayment = async () => {
    try {
      const paymentDetails = await getPaymentTopay(paymentId);
      console.log(paymentDetails);
      setPayment(paymentDetails);
      dispatch(setCurrentPayment(paymentDetails));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPayment();
    // setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  const handlePayment = () => {
    console.log('Hello');
    router.push({
      pathname: '/Paying',
      query: {
        paymentLink: payments.paymentLink,
      },
    });
  };

  return (
    <div class="min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div class="relative px-6 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 w-1/3 sm:mx-auto sm:rounded-lg sm:px-10">
        <div class="w-full mx-auto">
          <h1>Payment Summary</h1>
          <div class="divide-y divide-gray-300/50">
            <div class="py-8 text-base leading-7 space-y-6 text-gray-600">
              {payments.courses.map((course) => {
                return (
                  <CartItem
                    key={course.id}
                    course={course.title}
                    price={course.pricing}
                    pictureURL={course.img}
                    removeBtn={false}
                  />
                );
              })}
            </div>
            <div class="pt-8 text-base leading-7 font-semibold">
              <p class="text-gray-900">Do you wish to continue?</p>
              <div class="flex flex-1 items-center">
                <div class="items-end w-full">
                  <Link href="/Cart">
                    <a class="flex font-semibold text-indigo-600 text-sm mt-10">
                      <svg
                        class="fill-current mr-2 text-indigo-600 w-4"
                        viewBox="0 0 448 512"
                      >
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                      </svg>
                      Continue Shopping
                    </a>
                  </Link>
                </div>
                <div class="flex mt-10 w-full justify-end">
                  <Button type={'button'} onClick={handlePayment}>
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
