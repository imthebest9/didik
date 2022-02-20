import React from 'react';

const Card = ({ title, img, noStudents }) => {
  return (
    <div style={{backgroundColor: "#69EDE0"}} class=" max-w-sm bg-gray-300 rounded-lg border border-gray-200 shadow-md mr-6 h-full p-6">
      <div class="flex flex-col items-center pt-10">
        <img class="mb-3 w-full h-32" src={img} />
        <h3 class="h1-font mt-3 mb-1 text-xl font-medium ">
          {title}
        </h3>
        <h3 class="h3-font mt-3 mb-1 text-base font-medium">
          {'Enrolled: ' + noStudents}
        </h3>
      </div>
    </div>
  );
};

export default Card;
