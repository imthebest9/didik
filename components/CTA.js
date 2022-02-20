import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';

const CTA = () => {
  return (
    <section style={{ backgroundColor: '#79E0F0' }} className="flex justify-center items-center md:h-80 sm:h-90 md:p-0 p-4 mt-20 box-content green-colour">
      <div
        style={{ backgroundColor: '#69EDE0' }}
        class="grid md:grid-cols-2 sm:grid-cols-1 gap-4 p-4 w-3/4 text-center rounded-lg shadow-lg sm:p-8"
      >
        <div className="flex order-last md:order-first">
          <div className="flex flex-col justify-center">
            <div className="font-semibold text-2xl mt-4">
              Want to become a tutor
            </div>
            <div className="font-semibold text-2xl mb-7">and earn online</div>
            <Link href={'/Login'}>
              <a class="inline-flex items-center justify-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Click Here
              </a>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center order-first md:order-last">
          {' '}
          <Image
            className="order-1"
            src="/images/teaching.png"
            height={200}
            width={200}
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;
