import React, { useEffect, useState } from 'react';
import nookies from 'nookies';
import { getSingleDashboard } from '../api';

const OverallProgressCard = ({user}) => {
  
  return (
    <div class="p-6 w-1/2 ml-5 bg-white rounded-lg border border-gray-200 shadow-md">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {user?.firstName} {user?.lastName}
        </h5>
      </a>
      <img
        class="w-20 h-20 rounded-full mb-4"
        src= {user?.profilePic}
        alt="user photo"
      />
      <a
        href={'/profile/' + user?._id}
        class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Visit profile
        <svg
          class="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default OverallProgressCard;
