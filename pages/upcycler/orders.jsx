import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useForceUpdate } from 'framer-motion';
import Loading from '../../components/loadingSkeletonOrders';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const status = ['Collected', 'Processing1', 'Processing2', 'Pickup', 'Cancel'];

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/upcycler/orders`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(value) {
    setSelectedOrder(value);
    setIsOpen(true);
  }

  async function updateOrderStatus() {
    try {
      const data = await axios.put(`/api/upcycler/orders/update`, {
        orderId: selectedOrder,
        statusOrder: selectedItem,
      });
      console.log(data);
      toast.success(`Order status updated to ${data.data} Please refresh`);
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error(getError(err));
    }
    closeModal();
    useForceUpdate;
  }

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="flex justify-start sm:shadow-2xl sm:mx-6 sm:p-6 sm:rounded-2xl">
          <div>
            <ul>
              <li>
                <Link href="/upcycler/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link
                  className="font-bold text-primary text-3xl"
                  href="/upcycler/orders"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/upcycler/contact">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto md:col-span-3 h-fit sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
          <h1 className="mb-4 text-3xl font-bold text-primary">
            Upcycler Orders
          </h1>

          {loading ? (
            <div>
              <Loading />
            </div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">OrderId</th>
                    <th className="p-5 text-left">Cloths</th>
                    <th className="p-5 text-left">Price</th>
                    <th className="p-5 text-left">DUE AT</th>
                    <th className="p-5 text-left">COMPLETED</th>
                    <th className="p-5 text-left">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-5">{order._id.substring(20, 24)}</td>
                      <td className="p-5">{order.totalCloths}</td>
                      <td className="p-5">₹{order.totalPrice}</td>
                      <td className="p-5">
                        {order.dueAt
                          ? `${order.dueAt.substring(0, 10)}`
                          : 'not set'}
                      </td>
                      <td className="p-5">
                        {order.isCompleted ? 'Completed✅' : 'Ongoing'}
                      </td>
                      <td className="p-5">
                        <div className="flex flex-col">
                          <div className="text-center text-lg font-medium text-primary my-1">
                            {order.isStatus ? order.isStatus : 'not set'}
                          </div>
                          <button
                            onClick={() => openModal(order._id)}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-1 px-1 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 mt-1"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
                    className="text-2xl font-bold leading-6 text-gray-900 text-center"
                  >
                    Update Status of Order
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      your available option are:
                    </p>
                    <div className="w-full px-4 py-1">
                      <div className="mx-auto w-full max-w-md">
                        <RadioGroup
                          value={selectedItem}
                          onChange={setSelectedItem}
                        >
                          <RadioGroup.Label className="sr-only">
                            Server size
                          </RadioGroup.Label>
                          <div className="space-y-2">
                            {status.map((plan) => (
                              <RadioGroup.Option
                                key={plan}
                                value={plan}
                                className={({ active, checked }) =>
                                  `${
                                    active
                                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-accent1'
                                      : ''
                                  }
                  ${
                    checked
                      ? 'bg-accent3 bg-opacity-75 text-primary'
                      : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                              >
                                {({ checked }) => (
                                  <>
                                    <div className="flex w-full items-center justify-between">
                                      <div className="flex items-center">
                                        <div className="text-sm">
                                          <RadioGroup.Label
                                            as="p"
                                            className={`font-medium  ${
                                              checked
                                                ? 'text-primary'
                                                : 'text-primary'
                                            }`}
                                          >
                                            {plan}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      {checked && (
                                        <div className="shrink-0 text-white">
                                          <CheckIcon className="h-6 w-6" />
                                        </div>
                                      )}
                                    </div>
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                  <button
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-3  text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 my-3"
                    onClick={updateOrderStatus}
                  >
                    Update
                  </button>
                  <br />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Layout>
  );
}

AdminOrderScreen.auth = { upcyclerOnly: true };
