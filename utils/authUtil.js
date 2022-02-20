import React from 'react';
import { getUser } from '../api';
import nookies from 'nookies';

export const setUser = async () => {
  try {
    const user = await getUser(nookies.get().uid);
    if (user) {
      nookies.set(undefined, 'userId', user._id, {});
      nookies.set(undefined, 'role', user.role, {});
    }
  } catch (err) {
    console.log(err);
  }
};

export const verifyUser = (allowedIds) => {
  const userId = nookies.get().userId;
  return allowedIds.includes(userId);
};
