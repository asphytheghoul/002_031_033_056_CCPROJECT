import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import getError from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import nProgress from 'nprogress';
import Loading from '../components/Loading';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
// import axios from 'axios';

export default function LoginScreen() {
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { redirect } = router.query;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const submitHandler = async ({ email, password }) => {
    nProgress.start();
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
        nProgress.done();
        setLoading(false);
      }
    } catch (err) {
      toast.error(getError(err));
      setLoading(false);
      nProgress.done();
    }
  };

  return (
    <Layout title="Login">
      {loading && <Loading Word="Login In" />}
      <div className="flex h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
          <form
            className="mx-auto max-w-screen-md"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
                className="w-full"
                id="email"
                autoFocus
              ></input>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Please enter password',
                  minLength: {
                    value: 6,
                    message: 'password is more than 5 chars',
                  },
                })}
                className="w-full"
                id="password"
                autoFocus
              ></input>
              {errors.password && (
                <div className="text-red-500 ">{errors.password.message}</div>
              )}
            </div>
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-accent1 focus:ring-accent1"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-primary"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button
                  onClick={openModal}
                  className="font-medium text-secondary hover:text-accent1"
                  type="button"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
            <div className="flex mb-4 justify-center items-center">
              <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-2 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2">
                Login
              </button>
            </div>
            <div className="mb-4 ">
              Don&apos;t have an account? &nbsp;
              <Link
                className="text-accent1 hover:text-accent2"
                href={`/Register?redirect=${redirect || '/'}`}
              >
                Register
              </Link>
            </div>
          </form>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Forgot your password?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`Please don't worry we will send you the instructions to
                          your mail`}
                      </p>
                    </div>
                    <br />
                    <ForgotPasswordForm></ForgotPasswordForm>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Layout>
  );
}
