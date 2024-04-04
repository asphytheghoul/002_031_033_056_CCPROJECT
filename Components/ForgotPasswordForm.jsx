// import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import nProgress from 'nprogress';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import axios from 'axios';
// import axios from 'axios';

export default function LoginScreen() {
  const [sending, setSending] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email }) => {
    nProgress.start();
    setSending(true);
    console.log(email);
    try {
      const result = await axios.post('/api/password/forgot', { email });
      toast.success('Message sent successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
    setSending(false);
    nProgress.done();
  };

  return (
    <form
      className="mx-auto max-w-screen-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="mb-4">
        <input
          type="email"
          {...register('email', {
            required: 'Please enter email',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              message: 'Please enter valid email',
            },
          })}
          placeholder="Please enter your email address"
          className="w-full"
          id="email"
          autoFocus
        ></input>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="flex mb-4 justify-center items-center">
        <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-2 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2">
          {sending ? 'Sending...' : 'Send Reset Link'}
        </button>
      </div>
    </form>
  );
}
