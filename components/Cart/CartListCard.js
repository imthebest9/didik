import Link from 'next/link';
import React from 'react';
import CartItem from './CartItem';

const CardListCard = ({ onPlaceOrder, cartItems, onRemove }) => {
  console.log(cartItems === null)
  return (
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{cartItems?.length} Items</h2>
        </div>
        <div class="flex mt-10 mb-5">
          <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/3">
            Course Details
          </h3>

          <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/3 text-center">
            Price
          </h3>
        </div>
        {cartItems?.map((item) => {
          return (
            <CartItem
              key={item._id}
              id={item._id}
              pictureURL={item.img}
              course={item.title}
              price={item.pricing}
              onRemove={onRemove}
            />
          );
        })}
        <Link href="/">
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

      <div id="summary" class="w-2/4 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">
            Items {cartItems?.length}
          </span>
          <span class="font-semibold text-sm">
            RM
            {cartItems?.reduce((a, b) => a + (parseInt(b['pricing']) || 0), 0)}
          </span>
        </div>
        <div class="border-t mt-8">
          <div class="flex font-semibold justify-between py-6 text-sm uppercase">
            <span>Total cost</span>
            <span>
              RM
              {cartItems?.reduce((a, b) => a + (parseInt(b['pricing']) || 0), 0)}
            </span>
          </div>
          <button
            onClick={() => onPlaceOrder()}
            class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardListCard;
