/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { Store } from '../utils/Store';
// import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductItems({ product }) {
  const { state, dispatch } = useContext(Store);
  const [cartAdd, setCartAdd] = useState(false);
  // const { cart } = state;

  const addToCartHandler = async () => {
    event.preventDefault();
    setCartAdd(true);
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      setCartAdd(false);
      toast.error('Sorry product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    // router.push('/cart');
    toast.success('Product added to cart');
    setCartAdd(false);
  };

  return (
    <>
      <div className="shadow-md rounded-2xl mt-10 sm:mt-0">
        <div className="relative card rounded-2xl">
          <Link href={`/product/${product.slug}`}>
            <img
              className=" h-[350px] object-fill rounded"
              src={product.image}
              alt={product.name}
            />
          </Link>
          <div className="absolute -bottom-16 w-full">
            <div className="relative py-2  bg-shade2">
              <div className="flex items-center justify-between px-5">
                <Link href={`/product/${product.slug}`}>
                  <h2 className="text-lg md:text-xl font-semibold">
                    {product.name}
                  </h2>
                  <p className="text-base">{product.brand}</p>
                </Link>
                <p className="align-text-top md:items-center">
                  ₹{product.price}
                </p>
              </div>
            </div>
            <div className="flex justify-center py-4 bg-shade2">
              <Link
                className="flex z-10 justify-center sm:w-full  sm:primary-button mx-2 sm:mx-4  rounded bg-accent2 py-2 px-3  shadow outline-none hover:bg-accent1  active:bg-accent1"
                href={`/product/${product.slug}`}
              >
                <button type="button">Know More</button>
              </Link>
              <button
                className="z-10 sm:w-full sm:primary-button mx-2 sm:mx-4 rounded bg-accent2 py-2 px-3  shadow outline-none hover:bg-accent1  active:bg-accent1"
                type="button"
                onClick={addToCartHandler}
              >
                {cartAdd ? 'Adding...' : 'Add to cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
