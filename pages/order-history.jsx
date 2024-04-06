import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useReducer } from 'react';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import LoadingSkeleton from '../components/loadingSkeletonOrders';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
function OrderHistoryScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrders();
  }, []);
  return (
    <Layout title="Order History">
      <div className="flex justify-center items-center">
        <h1 className="mb-4 text-3xl font-bold text-primary">Order History</h1>
      </div>
      {loading ? (
        <div>
          <LoadingSkeleton />
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto mx-[10vw] md:mx-[20vw] h-[100vh]">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-primary text-left">ID</th>
                <th className="p-5 text-primary text-left">Date</th>
                <th className="p-5 text-primary text-left">Total</th>
                <th className="p-5 text-primary text-left">Paid</th>
                <th className="p-5 text-primary text-left">Status</th>
                <th className="p-5 text-primary text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                  <td className=" p-5 ">{order.createdAt}</td>
                  <td className=" p-5 ">₹{order.totalPrice}</td>
                  <td className=" p-5 ">
                    {order.isPaid ? `${order.paidAt}` : 'not paid'}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'not delivered'}
                  </td>
                  <td className=" p-5 ">
                    <Link
                      className="font-medium text-accent1 hover:text-secondary"
                      href={`/order/${order._id}`}
                      passHref
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;
