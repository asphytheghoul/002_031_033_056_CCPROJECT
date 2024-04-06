import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Cookies from 'js-cookie';
import { Menu } from '@headlessui/react';

import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';

export default function Navbar() {
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
    <div>
      <header>
        <div className="flex w-screen py-4 items-center bg-transparent ">
          <div className="flex w-5/6 justify-start items-center">
            <Link href="/">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width="300"
                height={88}
              />
            </Link>
            <Link
              className="text-2xl font-semibold text-secondary mx-4"
              href="/About"
            >
              About Us
            </Link>
            <Link
              className="text-2xl font-semibold text-secondary mx-4"
              href="/OurWork"
            >
              Our Work
            </Link>
          </div>
          <div className="flex w-1/6 justify-center">
            <div className="flex justify-center items-center">
              <Link
                className="text-2xl font-semibold text-secondary"
                href="/cart"
              >
                Cart
              </Link>
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bg-accent1 px-2 py-1 text-xs font-bold text-black">
                  {cartItemsCount}
                </span>
              )}
            </div>
            {status === 'loading' ? (
              <button className="py-2 px-8 mx-6 text-xl font-semibold text-primary bg-accent1 rounded-xl">
                Loading
              </button>
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block rounded-xl">
                <Menu.Button className="py-2 px-8 mx-6 text-m font-semibold text-primary bg-accent1 rounded-xl ">
                  Account
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                  <Menu.Item>
                    <div>
                      <h1 className="dropdown-link">{session.user.name}</h1>
                      <Link className="dropdown-link" href="/profile">
                        Profile
                      </Link>
                    </div>
                  </Menu.Item>
                  {session.user.isAdmin && (
                    <Menu.Item>
                      <Link className="dropdown-link" href="/admin/dashboard">
                        Admin Dashboard
                      </Link>
                    </Menu.Item>
                  )}
                  <Menu.Item>
                    <Link className="dropdown-link" href="/order-history">
                      Order History
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </Link>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/Login">
                <button className="py-2 px-8 mx-6 text-xl font-semibold text-primary bg-accent1 rounded-xl">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}
