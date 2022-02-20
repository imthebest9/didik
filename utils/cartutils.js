import nookies from 'nookies';
import { toast } from 'react-toastify';

export const addToCart = (id) => {
  const response = nookies.get().selectedCourses;
  console.log(response);
  if (response) {
    const cartItems = JSON.parse(response);
    const itemFound = cartItems.find((element) => element === id);
    if (itemFound) {
      toast.warn('This item already added to cart');
    } else {
      cartItems.push(id);
      nookies.set(undefined, 'selectedCourses', JSON.stringify(cartItems), {});
    }
  } else {
    nookies.set(undefined, 'selectedCourses', JSON.stringify([id]), {});
  }
  //   if (cartItems) {
  //     cartItems.push(id);
  //   } else {
  //     nookies.set(undefined, 'selectedCourses', JSON.stringify([id]), {});
  //   }
  return true;
};

export const removeCart = (id) => {
  const response = nookies.get().selectedCourses;
  if (response) {
    const cartItems = JSON.parse(response);
    const newItems = cartItems.filter((value, index, arr) => {
      return value !== id;
    });
    nookies.set(undefined, 'selectedCourses', JSON.stringify(newItems), {});
  }
};

export const removeAllItems = () => {
  nookies.set(undefined, 'selectedCourses', '', {});
};
