import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../components/Layout';
import { getError } from '../../../utils/error';
import { Dialog, Transition, RadioGroup } from '@headlessui/react';

// import User from '../../../models/User';
// import db from '../../../../utils/db';

// import db from '../../../utils/db';
// import User from '../../../models/User';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

const status = [
  { _id: '63b91addb0c470814cdd2bba', name: 'Ramesh' },
  {
    _id: '63b927e1dc6c93c5b0e35fe9',
    name: 'Adithya S K',
  },
];
export default function AdminOrderEditScreen() {
  const { query } = useRouter();
  const orderId = query.id;
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/admin/upcycler/orders/${orderId}`
        );
        dispatch({ type: 'FETCH_SUCCESS' });
        setValue('upcycler', data.upCycler);
        setValue('details', data.details);
        setValue('totalCloths', data.totalCloths);
        setValue('totalPrice', data.totalPrice);
        setValue('dueAt', data.dueAt);
        setValue('status', data.isStatus);
        setValue('completed', data.isCompleted);
        setValue('picked', data.isPicked);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, [orderId, setValue]);

  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    getUpcyclerDetails();
    setIsOpen(true);
  }

  const getUpcyclerDetails = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(
        `/api/admin/upcycler/orders/${orderId}/upcyclersDetails`
      );
      dispatch({ type: 'FETCH_SUCCESS' });
      console.log(data);
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };

  const updateUpcycler = async () => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/upcycler/orders/${orderId}/update`, {
        upcycler: selectedItem,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Upcycler updated successfully');
      // router.push('/admin/upcyclers');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }

    closeModal();
  };

  const submitHandler = async ({
    upcycler,
    details,
    totalCloths,
    totalPrice,
    dueAt,
    status,
    completed,
    picked,
  }) => {
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(`/api/admin/upcycler/orders/${orderId}`, {
        upcycler,
        details,
        totalCloths,
        totalPrice,
        dueAt,
        status,
        completed,
        picked,
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Order updated successfully');
      router.push('/admin/upcyclers');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title={`Edit Order ${orderId}`}>
      <div className="grid md:grid-cols-4 md:gap-5 mb-[5vh] h-fit">
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
        <div className="md:col-span-3 sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="alert-error">{error}</div>
          ) : (
            <form
              className="mx-auto max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-3xl font-bold text-primary">{`Edit Upcycler Order ${orderId}`}</h1>
              <div className="mb-4">
                <label htmlFor="name">Upcycler</label>
                <input
                  type="text"
                  className="w-full"
                  id="upcycler"
                  autoFocus
                  {...register('upcycler', {
                    required: 'Please enter upcycler',
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
                <button
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-accent2 py-3  text-sm font-medium text-primary hover:bg-accent1 focus:outline-none focus:ring-2 focus:ring-accent1 focus:ring-offset-2 my-3"
                  onClick={() => openModal()}
                >
                  Select Upcycler
                </button>
              </div>

              <div className="mb-4">
                <label htmlFor="details">Details of Order</label>
                <textarea
                  type="text"
                  rows="4"
                  className="w-full"
                  id="details"
                  {...register('details', {
                    required: 'Please enter details',
                  })}
                />
                {errors.details && (
                  <div className="text-red-500">{errors.details.message}</div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="clothNumber">Total Cloths</label>
                <input
                  type="number"
                  className="w-full"
                  id="totalCloths"
                  {...register('totalCloths', {
                    required: 'Please enter number of cloths',
                  })}
                />
                {errors.totalCloths && (
                  <div className="text-red-500">
                    {errors.totalCloths.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="price">Total Price</label>
                <input
                  type="number"
                  className="w-full"
                  id="totalPrice"
                  {...register('totalPrice', {
                    required: 'Please enter price',
                  })}
                />
                {errors.totalPrice && (
                  <div className="text-red-500">
                    {errors.totalPrice.message}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="dueAt">Due Date</label>
                <input
                  type="text"
                  className="w-full"
                  id="dueAt"
                  {...register('dueAt', {
                    required: 'Please enter price',
                  })}
                />
                {errors.dueAt && (
                  <div className="text-red-500">{errors.dueAt.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="status">Order Status For Upcyclers</label>
                <select
                  type="text"
                  className="w-full"
                  id="status"
                  {...register('status', {
                    required: 'Please enter status',
                  })}
                >
                  <option value="Collected">Collected</option>
                  <option value="Processing1">Processing1</option>
                  <option value="Processing2">Processing2</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Cancel">Cancel</option>
                </select>
                {errors.status && (
                  <div className="text-red-500">{errors.status.message}</div>
                )}
              </div>

              <div className="mb-4">
                <button disabled={loadingUpdate} className="primary-button">
                  {loadingUpdate ? 'Loading' : 'Update'}
                </button>
              </div>
              <div className="mb-4">
                <Link href={`/admin/upcyclers`}>Back</Link>
              </div>
            </form>
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
                    Select and Upcycler
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      Available Upcyclers:
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
                                key={plan._id}
                                value={plan._id}
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
                                            {plan.name}
                                          </RadioGroup.Label>
                                        </div>
                                      </div>
                                      {/* {checked && (
                                        <div className="shrink-0 text-white">
                                          <CheckIcon className="h-6 w-6" />
                                        </div>
                                      )} */}
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
                    // onClick={updateOrderStatus}
                    onClick={updateUpcycler}
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

AdminOrderEditScreen.auth = { adminOnly: true };

// export async function getServerSideProps() {
//   await db.connect();
//   const upcyclerDetails = [];
//   const upcycler = await User.find({ isUpcycler: true });
//   console.log(upcycler);
//   upcycler.map((lmao) => {
//     upcyclerDetails.push({ _id: lmao._id, name: lmao.name });
//   });
//   console.log(upcyclerDetails);

//   return {
//     // props: {
//     //   upcyclers: upcyclerDetails,
//     // },
//   };
// }
