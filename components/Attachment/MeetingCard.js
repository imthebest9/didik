import React from 'react';

const MeetingCard = ({ platform, startTime, endTime, meetingLink }) => {
  return (
    <a
      href={meetingLink}
      style={{ backgroundColor: '#69EDE0' }}
      class="flex flex-col items-center rounded-lg shadow-md md:flex-row md:max-w-md hover:bg-gray-100 mr-5"
    >
      <img
        class="object-cover w-full h-50 ml-16 rounded-t-lg md:h-auto md:w-20 md:rounded-none md:rounded-l-lg"
        src={`/images/${platform}.png`}
        alt=""
      />
      <div class="flex flex-col justify-center items-center ml-10 p-4 leading-normal">
        <h5 class="mb-2 h1-font tracking-tight text-gray-900">
          Meeting Link
        </h5>
        <p class="mb-3 font-normal ">
          Time: {startTime} - {endTime}
        </p>
        <a
          href={meetingLink}
          class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Join Now
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
    </a>
  );
};

export default MeetingCard;
