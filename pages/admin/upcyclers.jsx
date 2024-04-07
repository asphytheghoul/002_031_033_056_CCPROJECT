import axios from 'axios';
import Link from 'next/link';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  // const [selectedOrder, setSelectedOrder] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/upcycler/orders`);
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

  // function openModal() {
  //   setIsOpen(true);
  // }

  function completeHandler(value) {
    console.log(value);
    try {
      axios.put(`/api/admin/upcycler/orders/complete`, {
        orderId: value,
        completed: true,
      });
      toast.success('Order status updated to completed');
    } catch (err) {
      toast.error(getError(err));
    }
  }
  function incompleteHandler(value) {
    console.log(value);
    try {
      axios.put(`/api/admin/upcycler/orders/complete`, {
        orderId: value,
        completed: false,
      });
      toast.success('Order status updated to inCompleted');
    } catch (err) {
      toast.error(getError(err));
    }
  }
  async function deleteHandle(value) {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      await axios.put(`/api/admin/upcycler/orders/delete`, {
        orderId: value,
        delete: true,
      });
      toast.success('Order Successively Deleted');
    } catch (err) {
      toast.error(getError(err));
    }
  }

  async function editHandler(value) {
    router.push(`/admin/upcycler_orders/${value}`);
  }

  async function createHandler() {
    console.log('create handler called');
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      const { data } = await axios.post(`/api/admin/upcycler/orders/create`);
      toast.success('Product created successfully');
      router.push(`/admin/upcycler_orders/${data.newOrders_Upcycler._id}`);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  return (
    <Layout title="Admin Dashboard">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="flex justify-start sm:shadow-2xl sm:mx-6 sm:p-6 sm:rounded-2xl">
          <div>
            <ul>
              <li>
                <Link href="/admin/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/admin/orders">Orders</Link>
              </li>
              <li>
                <Link href="/admin/products">Products</Link>
              </li>
              <li>
                <Link href="/admin/users">Users</Link>
              </li>
              <li>
                <Link
                  className="font-bold text-primary text-3xl"
                  href="/admin/upcyclers"
                >
                  Upcyclers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="overflow-x-auto md:col-span-3 h-fit sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
          <div className="flex justify-between">
            <h1 className="mb-4 text-3xl font-bold text-primary">
              Upcycler Orders
            </h1>
            <button
              onClick={createHandler}
              className="relative flex my-2  mr-5 justify-center items-center rounded-md border border-transparent bg-accent2  px-3 text-lg font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 z-0"
            >
              Create New Order
            </button>
          </div>
          {loading ? (
            <div>Loading...</div>
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
                    <th className="p-5 text-left">Status</th>
                    <th className="p-5 text-left">COMPLETED</th>
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
                        <div className="flex flex-col">
                          {order.isStatus ? order.isStatus : 'not set'}
                        </div>
                      </td>
                      <td className="p-5 flex items-center justify-start ">
                        {order.isCompleted ? 'Completed✅' : 'Ongoing'}
                        {order.isCompleted ? (
                          <button
                            onClick={() => incompleteHandler(order._id)}
                            className="group relative flex  justify-center rounded-md border border-transparent bg-accent2 py-1 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 ml-4"
                          >
                            Incomplete
                          </button>
                        ) : (
                          <button
                            onClick={() => completeHandler(order._id)}
                            className="group relative flex  justify-center rounded-md border border-transparent bg-accent2 py-1 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 ml-4"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => editHandler(order._id)}
                          className="group relative flex  justify-center rounded-md border border-transparent bg-accent2 py-1 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 ml-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteHandle(order._id)}
                          className="group relative flex  justify-center rounded-md border border-transparent bg-accent2 py-1 px-4 text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 ml-4"
                        >
                          Delete
                        </button>
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
                  <button className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-3  text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 my-3">
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
