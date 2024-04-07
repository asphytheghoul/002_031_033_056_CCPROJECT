import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
    toast.success('Product updated in the cart');
  };

  return (
    <>
      <Layout title="Shopping Cart">
        <div className="w-fit md:w-4/5 h-screen m-auto">
          <div className="flex justify-center items-center">
            <h1 className="mb-4 text-3xl font-bold text-primary">
              Shopping Cart
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <div className="flex flex-col w-fit md:w-2/6 m-auto items-center">
              <div className="text-lg text-secondary font-semibold mt-3 mb-1">
                Cart is empty.
              </div>
              <div>
                <Link href="/">
                  <button className=" py-2 px-8 text-lg md:text-xl font-medium text-primary bg-accent1 rounded-xl m-4">
                    Go shopping
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="w-fit m-auto"></div>
              <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                  <table className="min-w-full ">
                    <thead className="border-b">
                      <tr>
                        <th className="p-5 text-left text-primary">Item</th>
                        <th className="p-5 text-right text-primary ">
                          Quantity
                        </th>
                        <th className="p-5 text-right text-primary">Price</th>
                        <th className="p-5 text-primary">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.slug} className="border-b">
                          <td>
                            <Link href={`/product/₹{item.slug}`}>
                              <div className="flex items-center">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={100}
                                  height={100}
                                ></Image>
                                &nbsp;
                                <p className="text-lg pl-5 text-primary font-semibold">
                                  {item.name}
                                </p>
                              </div>
                            </Link>
                          </td>
                          <td className="p-5 text-right">
                            <select
                              className="text-lg font-semibold text-primary"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartHandler(item, e.target.value)
                              }
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="p-5 text-right text-lg font-semibold text-primary">
                            ₹{item.price}
                          </td>
                          <td className="p-5 text-center text-lg font-semibold text-primary">
                            <button
                              className="p-5 text-secondary"
                              onClick={() => removeItemHandler(item)}
                            >
                              <MdDelete />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card p-5">
                  <ul>
                    <li>
                      <div className="pb-3 text-xl m-2">
                        Subtotal (
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}) : ₹
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}
                      </div>
                    </li>
                    <li>
                      <Link href="/">
                        <button className="primary-button m-2">
                          Continue shopping
                        </button>
                      </Link>
                      <button
                        onClick={() => router.push('/shipping')}
                        className="primary-button w-full m-2"
                      >
                        Check Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
