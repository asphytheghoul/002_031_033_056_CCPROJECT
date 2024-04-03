import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto w-[80vw] md:w-[60vw] lg:w-[40vw] h-fit"
        onSubmit={submitHandler}
      >
        <h1 className="mb-4 mt-12 text-3xl font-bold text-primary text-center">
          Payment Method
        </h1>

        <ul className="grid gap-6 w-full md:grid-cols-1 mt-12">
          {['UPI', 'Cash on delivery'].map((payment) => (
            <div key={payment}>
              <li>
                <input
                  name="paymentMethod"
                  id={payment}
                  type="radio"
                  value="hosting-small"
                  className="hidden peer"
                  checked={selectedPaymentMethod === payment}
                  onChange={() => setSelectedPaymentMethod(payment)}
                />
                <label
                  htmlFor={payment}
                  className="inline-flex justify-between items-center p-5 w-full dark:text-gray-800 bg-white rounded-lg border border-gray-200 cursor-pointer  dark:border-gray-800 dark:peer-checked:text-accent2 peer-checked:border-accent1 peer-checked:text-accent1 dark:hover:text-black hover:bg-gray-100  dark:bg-white dark:hover:bg-slate-50"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      {payment}
                    </div>
                  </div>
                  <svg
                    aria-hidden="true"
                    className="ml-3 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </label>
              </li>
            </div>
          ))}
        </ul>
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="primary-button mr-8 mt-12"
          >
            Back
          </button>
          <button className="primary-button ml-8 mt-12">Next</button>
        </div>
      </form>
    </Layout>
  );
}

PaymentScreen.auth = true;
