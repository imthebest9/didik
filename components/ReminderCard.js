import Image from 'next/image';
import React from 'react';

const ReminderCard = ({ name }) => {
  console.log(name);
  return (
    <div
      style={{ backgroundColor: '#79E0F0' }}
      class="flex p-6 green-colour rounded-lg border border-gray-200 shadow-md "
    >
      <div>
        <Image src="/images/IntroCard.svg" width={300} height={300} />
      </div>
      <div className="pl-5 flex justify-center  flex-col">
        <h5 class="h1-font mb-2">
          Hello, {name.firstName} {name.lastName}
        </h5>

        <p class="mb-3 h3-font text-gray-700">
          There is no end to education. It is not that you read a book, pass an
          examination, and finish with education.
        </p>
      </div>
    </div>
  );
};

export default ReminderCard;
