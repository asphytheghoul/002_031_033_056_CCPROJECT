/* eslint-disable @next/next/no-img-element */
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';

import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

const navigation = [
  { name: 'About Us', href: '/About', current: false },
  { name: 'Our Work', href: '/OurWork', current: false },
  { name: 'Contribute', href: '#', current: false },
  { name: 'Contact Us', href: '/ContactUs', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [isShowing, setIsShowing] = useState(false);
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/Login' });
  };
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-shade2 rounded-b-[30px] sm:rounded-none sm:bg-transparent py-3 sm:py-8 z-[9999]"
      >
        {({ open }) => (
          <>
            <div className="mx-auto  px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden pl-3">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary bg-slate-50 hover:bg-accent2 hover:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-center sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <img
                        className="block w-[40px] lg:hidden"
                        src="/assets/logo_small.png"
                        alt="Your Company"
                      />
                    </Link>
                    <Link href="/">
                      <img
                        className="hidden w-[300px] lg:block"
                        src="/assets/logo.png"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-2 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-accent2 text-secondary'
                              : 'text-gray-800 hover:bg-accent2 hover:text-white',
                            'px-3 py-2 rounded-md text-xl font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-8">
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-accent1 px-2 py-1 text-xs font-bold text-black">
                      {cartItemsCount}
                    </span>
                  )}
                  <Link href="/cart">
                    <button
                      type="button"
                      className="rounded-full  p-1 text-primary hover:text-accent1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent1"
                    >
                      <span className="sr-only">View Cart</span>
                      {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                      {/* cart icon */}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 md:w-9 md:h-9"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </button>
                  </Link>
                  {status === 'loading' ? (
                    <button className="py-1 px-4 sm:py-2 sm:px-8 sm:mx-6 sm:text-xl sm:font-semibold text-primary bg-accent1 rounded-xl">
                      Loading
                    </button>
                  ) : session?.user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          onClick={() =>
                            setIsShowing((isShowing) => !isShowing)
                          }
                          className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white"
                        >
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-6 w-6 md:h-10 md:w-10 rounded-full"
                            src={'/assets/user.png'}
                            alt="UserImage"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                        show={isShowing}
                      >
                        <div>
                          <Menu.Items className="absolute right-0 z-[9999] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/profile"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-lg text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            {session.user.isAdmin && (
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-lg text-gray-700'
                                    )}
                                    href="/admin/dashboard"
                                  >
                                    Admin Dashboard
                                  </Link>
                                )}
                              </Menu.Item>
                            )}
                            {session.user.isUpcycler && (
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-lg text-gray-700'
                                    )}
                                    href="/upcycler/dashboard"
                                  >
                                    Upcycler Dashboard
                                  </Link>
                                )}
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/order-history"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-lg text-gray-700'
                                  )}
                                >
                                  Order History
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  onClick={logoutClickHandler}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-lg text-gray-700'
                                  )}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </div>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link href="/Login">
                      <button className="py-1 px-4 rounded-md mx-1 sm:py-2 sm:px-8 sm:mx-6 sm:text-xl sm:font-semibold text-primary bg-accent1 sm:rounded-xl">
                        Login
                      </button>
                    </Link>
                  )}

                  {/* Profile dropdown */}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 rounded-xl">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-accent2 text-primary'
                        : 'text-primary hover:bg-accent2 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium z-[9999]'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
