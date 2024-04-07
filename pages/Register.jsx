import Link from 'next/link';
import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout';
import getError from '../utils/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

import EmailVerification from '../components/EmailVerification';

export default function RegisterScreen() {
  const { data: session } = useSession();
  const [verification, setVerification] = React.useState(false);
  const [verifiedEmail, setVerifiedEmail] = React.useState('');
  // setVerification(false);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        verifiedEmail,
        password,
      });
      toast.success('User created successfully');

      const result = await signIn('credentials', {
        redirect: false,
        email: verifiedEmail,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // const [choreLogs, setChoreLogs] = React.useState([]);
  const addChoreLog = (log) => {
    // setChoreLogs([]);
    // let logs = [...choreLogs, log];
    // setChoreLogs(logs);
    // console.log('Parent component', log);
    if (log[1] === true) {
      setVerification(true);
      setVerifiedEmail(log[0]);
    }
  };

  return (
    <Layout title="Create Account">
      <div className="flex h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          {!verification ? (
            <>
              <EmailVerification addChoreLog={addChoreLog} />
            </>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="w-full"
                  id="name"
                  autoFocus
                  {...register('name', {
                    required: 'Please enter name',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              {/* <div className="mb-4">
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
                ></input>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div> */}
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
              <div className="mb-4">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="w-full"
                  type="password"
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Please enter confirm password',
                    validate: (value) => value === getValues('password'),
                    minLength: {
                      value: 6,
                      message: 'confirm password is more than 5 chars',
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === 'validate' && (
                    <div className="text-red-500 ">Password do not match</div>
                  )}
              </div>
              <div className="flex mb-4 justify-center items-center">
                <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-2 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2">
                  Register
                </button>
              </div>

              <div className="mb-4 ">
                have an account? &nbsp;
                <Link
                  className="text-accent1 hover:text-accent2"
                  href={`/Login?redirect=${redirect || '/'}`}
                >
                  Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
