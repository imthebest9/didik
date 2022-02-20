import React, { useState, useCallback, useEffect, Fragment } from 'react';
//import { useUser } from '@auth0/nextjs-auth0';
import { useAuth } from '../auth';
import Button from './Button';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Link from 'next/link';
import { signOut } from '../utils/firebase';
import nookies from 'nookies';
import { receiveUser } from "../api";
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Menu, Transition } from '@headlessui/react';

// https://flowbite.com/docs/components/navbar/
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const NavBar = ({ authenticated = false }) => {
  const userId = nookies.get().userId;
  const [users, setUsers] = useState({});
  const { user } = useAuth();
  const [dropDownActive, setDropDownActive] = useState(false);
  console.log(user);
  const handleDropDown = useCallback(() => {
    setDropDownActive(!dropDownActive);
  });

  useEffect(async () => {
    const res = await receiveUser(userId);
    setUsers(res);
  }, [users]);

  return (
    <nav style={{ backgroundColor: '#79E0F0' }} class="border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" class="flex">
          <svg
            class="mr-3 h-10"
            viewBox="0 0 52 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
              fill="#76A9FA"
            />
            <path
              d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
              fill="#A4CAFE"
            />
            <path
              d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
              fill="#1C64F2"
            />
          </svg>
          <span class="self-center text-lg font-semibold whitespace-nowrap">
            Didik
          </span>
        </a>
        {/* <div class="flex-1 items-center justify-end md:order-2">
          <AiOutlineShoppingCart size="2rem" />
        </div> */}
        <div class="flex md:order-3">
          <Link href={'/Cart'}>
            <AiOutlineShoppingCart size="2rem" class="mr-6" />
          </Link>
          {!user ? (
            <>
              <Button href={'Login'}>Sign In</Button>
            </>
          ) : (
            <Menu as="div" className="text-left">
            <div>
                <Menu.Button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                  <img
                  class="w-8 h-8 rounded-full"
                  src= {users?.profilePic} 
                  alt="user photo"
                />
                </Menu.Button>
            </div>
             <div className='fixed right-5 z-50'>
              <Menu.Items className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                        <a
                            className={classNames(
                                active ? 'text-white' : 'text-white',
                                'border-b-2 border-slate-50 block px-4 py-2 text-sm flex justify-between space-x-80'
                            )}
                            >
                            {user?.email}
                        </a>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <Link href="/AccountManager">
                        <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                          Account
                        </a>
                      </Link>
                    )}
                    </Menu.Item>
                    <Menu.Item>
                    {({ active }) => (
                        <button
                        onClick={async () => {
                          await signOut();
                        }}
                        
                        class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        
                        Sign out
                      </button>
                    )}
                    </Menu.Item>
                </div>
              </Menu.Items>
              </div>
            </Menu>
            // <button
            //   type="button"
            //   class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            //   id="user-menu-button"
            //   aria-expanded="false"
            //   type="button"
            //   data-dropdown-toggle="dropdown"
            //   onClick={handleDropDown}
            // >
            //   <span class="sr-only">Open user menu</span>
            //   <img
            //     class="w-8 h-8 rounded-full"
            //     src= {users?.profilePic}
            //     alt="user photo"
            //   />
            // </button>
          )}
          {/* <div
            class={
              (dropDownActive ? 'inline' : 'hidden') +
               'z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
            }
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span class="block text-sm text-gray-900 dark:text-white">
                {user?.name}
              </span>
              <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </span>
            </div>
            <ul class="py-1" aria-labelledby="dropdown">
              <li>
                <Link href="/AccountManager">
                  <a class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Account
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <button
                  onClick={async () => {
                    await signOut();
                  }}
                  class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div> */}
          {/* <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              class="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> */}
        </div>
        <div
          class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
         
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
