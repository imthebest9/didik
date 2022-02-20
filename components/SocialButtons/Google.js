import React from 'react';

const Google = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" class="transition duration-200 border border-gray-200 text-gray-500 w-3/4 py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block my-8">Google</button>
  );
};

export default Google;
