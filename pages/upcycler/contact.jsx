import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';

import axios from 'axios';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '../../utils/error';
// import { getError } from '../../utils/error';

function Upcycler_dashboard() {
  const { data: session } = useSession();
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
    <>
      {session.user.isUpcycler ? (
        <Layout>
          <div className="grid  md:grid-cols-4 md:gap-5 mb-[5vh]">
            <div className="flex justify-start sm:shadow-2xl sm:mx-6 sm:p-6 sm:rounded-2xl">
              <div>
                <ul>
                  <li>
                    <Link href="/upcycler/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/upcycler/orders">Orders</Link>
                  </li>
                  <li>
                    <Link
                      className="font-bold text-primary text-3xl"
                      href="/upcycler/contact"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-3 sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
              <h1 className="mb-4 text-3xl font-bold text-primary mt-5">
                Contact Us
              </h1>

              <>
                <div>
                  <form
                    className="block md:flex justify-start "
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <div className="flex flex-col justify-start h-fit mx-8 my-6 md:my-0 md:w-2/5 md:mx-[5vw] md:h-[80vh]">
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
                          <div className="text-red-500">
                            {errors.name.message}
                          </div>
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
                              value:
                                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                              message: 'Please enter valid email',
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="text-red-500">
                            {errors.email.message}
                          </div>
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
              </>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout>
          <h1>Unauthenticated page</h1>
        </Layout>
      )}
    </>
  );
}

Upcycler_dashboard.auth = { upcyclerOnly: true };
export default Upcycler_dashboard;
