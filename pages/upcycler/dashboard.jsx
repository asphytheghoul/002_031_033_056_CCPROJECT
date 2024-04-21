import React from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';
import { getError } from '../../utils/error';

import Loading from '../../components/loadingSkeletonStats';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Upcycler_dashboard() {
  const { data: session } = useSession();
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/upcycler/summary`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {session.user.isUpcycler ? (
        <Layout>
          <div className="grid  md:grid-cols-4 md:gap-5 mb-[5vh]">
            <div className="flex justify-start sm:shadow-2xl sm:mx-6 sm:p-6 sm:rounded-2xl">
              <div>
                <ul>
                  <li>
                    <Link
                      className="font-bold text-primary text-3xl"
                      href="/upcycler/dashboard"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/upcycler/orders">Orders</Link>
                  </li>
                  <li>
                    <Link href="/upcycler/contact">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-span-3 sm:shadow-2xl sm:p-6 sm:rounded-2xl sm:mr-6">
              <h1 className="mb-4 text-3xl font-bold text-primary">
                Admin Dashboard
              </h1>
              {loading ? (
                <div>
                  <Loading />
                </div>
              ) : error ? (
                <div className="alert-error">{error}</div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="card m-5 p-5">
                      <p className="text-3xl">₹{summary.ordersPrice} </p>
                      <p>Sales</p>
                      <Link href="/upcycler/dashboard">View sales</Link>
                    </div>
                    <div className="card m-5 p-5">
                      <p className="text-3xl">{summary.ordersCount} </p>
                      <p>Orders</p>
                      <Link href="/upcycler/orders">View orders</Link>
                    </div>
                    <div className="card m-5 p-5">
                      <p className="text-3xl">
                        {summary.ordersCompletedCount}{' '}
                      </p>
                      <p>Completed Orders</p>
                      <Link href="/upcycler/orders?complete">View Orders</Link>
                    </div>
                    {/* <div className="card m-5 p-5">
                      <p className="text-3xl">{summary.usersCount} </p>
                      <p>Ongoing Orders</p>
                      <Link href="/admin/orders?ongoing">View Orders</Link>
                    </div> */}
                  </div>
                </div>
              )}
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
