import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import axios from 'axios';
import Layout from '../components/Layout';

import Mail from '../components/Mail';

export default function ContactUs() {
  const [sendMail, setSendMail] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, subject, message }) => {
    setSendMail(true);
    try {
      const result = await axios.post('/api/customer/contactUs', {
        name,
        email,
        subject,
        message,
      });
      toast.success('Message sent successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
    setSendMail(false);
  };

  return (
    <Layout title="Contact Us">
      <div>
        <div className="flex justify-center items-center">
          <h1 className="mb-4 text-3xl font-bold text-primary">Contact Us</h1>
        </div>
        <form
          className="block md:flex md:w-screen justify-center items-center"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Mail className="m-10 md:m-0"></Mail>
          <div className="flex flex-col justify-center h-fit mx-8 my-6 md:my-0 md:w-2/5 md:mx-[5vw] md:h-[80vh]">
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

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="w-full"
                id="email"
                {...register('email', {
                  required: 'Please enter email',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                    message: 'Please enter valid email',
                  },
                })}
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password">Subject</label>
              <input
                className="w-full"
                type="text"
                id="subject"
                autoFocus
                {...register('subject', {
                  required: 'Please enter subject',
                })}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword">Message</label>
              <textarea
                rows="4"
                className="w-full"
                type="text"
                id="message"
                autoFocus
                {...register('message', {
                  required: 'Please enter subject',
                })}
              />
            </div>
            <div className="mb-4">
              <button className="primary-button">
                {sendMail ? 'Sending...' : 'Send Mail'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}

ContactUs.auth = false;
