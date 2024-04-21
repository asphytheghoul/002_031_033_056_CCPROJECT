import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';

import { getError } from '../../utils/error';
import { toast } from 'react-toastify';

import nProgress from 'nprogress';
import MoneyLoading from '../../components/MoneyLoader';
import Loader from '../../components/Loading';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELIVER_REQUEST':
      return { ...state, loading: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loading: false };
    case 'DELIVER_FAIL':
      return { ...state, loading: false };
    default:
      state;
  }
}
function OrderScreen() {
  const [loader, setLoader] = useState(false);
  // order/:id
  const { query } = useRouter();
  const orderId = query.id;
  const { data: session } = useSession();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    setLoader(true);
    nProgress.start();
    const res = await initializeRazorpay();

    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }

    const { data } = await axios.post('/api/razorpay', {
      orderId,
    });
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: 'Enable Up Cycling',
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: 'Thankyou for buing the green bag',
      image: 'assets/images/logo.png',
      handler: async function (response) {
        // Validate payment at server - using webhooks is a better idea.
        setLoader(false);
        nProgress.done();
        try {
          const { data } = await axios.put('/api/razorpay/success', {
            orderId,
            paymentId: response.razorpay_payment_id,
            paymentOrderId: response.razorpay_order_id,
          });
          toast.success(data);
        } catch (err) {
          toast.error('Payment Failed');
        }
        window.location.reload();
      },
      prefill: {
        name: session.user.name,
        email: session.user.email,
        contact: '6969696969',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/orders/${order._id}/deliver`,
        {}
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      toast.success('Order is delivered');
      window.location.reload();
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  }
  return (
    <Layout title={`Order ${orderId}`}>
      {loader && (
        <MoneyLoading Word="Razor Pay Initializing  Please wait a moment" />
      )}
      <div className="flex justify-center items-center">
        <h1 className="mb-4 text-xl md:text-3xl font-bold text-primary">{`Order ${orderId}`}</h1>
      </div>
      {loading ? (
        <Loader Word="Getting order Details" />
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="grid h-fit md:grid-cols-4 md:gap-5 px-[15vw] md:h-fit">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div className="mb-2 text-lg">
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>
              {isDelivered ? (
                <div className="alert-success">Delivered at {deliveredAt}</div>
              ) : (
                <div className="alert-error">Not delivered</div>
              )}
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div className="mb-2 text-lg">{paymentMethod}</div>
              {isPaid ? (
                <div className="alert-success">Paid at {paidAt}</div>
              ) : (
                <div className="alert-error">Not paid</div>
              )}
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          className="flex items-center"
                          href={`/product/${item.slug}`}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">₹{item.price}</td>
                      <td className="p-5 text-right">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="card  p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>₹{itemsPrice}</div>
                  </div>
                </li>{' '}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>₹{taxPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>₹{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>₹{totalPrice}</div>
                  </div>
                </li>
                {!isPaid && (
                  <li>
                    <button
                      // disabled={loading}
                      onClick={makePayment}
                      className="primary-button w-full"
                    >
                      {loading ? 'Loading...' : 'Make Payment'}
                    </button>
                  </li>
                )}
                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    <button
                      className="primary-button w-full"
                      onClick={deliverOrderHandler}
                    >
                      {loading ? 'Loading...' : 'Deliver Order'}
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

OrderScreen.auth = true;
export default OrderScreen;
