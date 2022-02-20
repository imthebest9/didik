import React from 'react';
import { removeCart } from '../../utils/cartutils';

const CartItem = ({ id, course, price, pictureURL, removeBtn = true , onRemove}) => {
  console.log(pictureURL);
  return (
    <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div class="flex w-2/3">
        <div class="w-20">
          <img class="h-24" src={pictureURL} alt="" />
        </div>
        <div class="flex flex-col justify-around ml-4">
          <span class="font-bold text-sm">{course}</span>
          
          {removeBtn ? (
            <button
              onClick={() => onRemove(id)}
              class="font-semibold hover:text-red-500 text-gray-500 text-xs"
            >
              Remove
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <span class="text-center w-1/3 font-semibold text-sm">RM{price}</span>
    </div>
  );
};

export default CartItem;
