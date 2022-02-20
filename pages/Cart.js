import React, { useCallback, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import nookies from 'nookies';
import CART from '../dummyData/cart';
import CardListCard from '../components/Cart/CartListCard';
import { createPayment, getCartItems } from '../api';
import { useRouter } from 'next/router';
import { removeAllItems, removeCart } from '../utils/cartutils';
import NavBar from '../components/Header';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Cart = () => {
  const [cartItems, setCartItems] = useState();
  const router = useRouter();
  const categories = [{ id: '0', title: 'Cart', type: 'Cart' }];

  const onRemoveItems = (id) => {
    removeCart(id);
    getItemDetails();
  };

  const handleOrder = async () => {
    try {
      const paymentDetails = {
        courses: JSON.parse(nookies.get().selectedCourses),
        amount: cartItems?.reduce(
          (a, b) => a + (parseInt(b['pricing']) || 0),
          0
        ),
        student: nookies.get().userId,
      };
      console.log(paymentDetails.amount);
      const makePayment = await createPayment(paymentDetails);
      console.log(makePayment);
      if (makePayment) {
        removeAllItems();
        router.push({
          pathname: '/PaymentSummary',
          query: { paymentId: makePayment._id },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getItemDetails = useCallback(async () => {
    try {
      if (nookies.get().selectedCourses) {
        const items = await getCartItems(nookies.get().selectedCourses);

        setCartItems(items);
      }
    } catch (err) {
      console.log(err);
    }
  }, [setCartItems]);

  useEffect(() => {
    getItemDetails();

    console.log(nookies.get().selectedCourses);
  }, [router, getItemDetails]);

  return (
    <>
      <NavBar />
      <div class="container mx-auto mt-10">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                    selected
                      ? 'bg-white shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                {category.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {categories.map((category) => (
              <Tab.Panel
                key={category.id}
                className={classNames(
                  'bg-white rounded-xl p-3',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                )}
              >
                <CardListCard
                  onPlaceOrder={handleOrder}
                  onRemove={onRemoveItems}
                  cartItems={cartItems}
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
};

export default Cart;
