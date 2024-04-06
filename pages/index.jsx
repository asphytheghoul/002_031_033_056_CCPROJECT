import Layout from '../components/Layout';
import Image from 'next/image';
import ProductItem from '../components/ProductItem';
import db from '../utils/db';
import Product from '../models/Product';
// import { Router } from 'next/router';
// import Loading from '../components/Loading';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home({ products }) {
  return (
    <>
      <div>
        <Layout>
          {/* <Loading></Loading> */}
          <div>
            <div class="fade-in">
              <Image
                className="-z-50 hidden sm:block"
                src="/assets/background_hero.png"
                layout="fill"
                objectFit="cover"
                alt=""
              />
              <div className="pl-13 sm:hidden">
                <Image
                  className="-z-10 block sm:hidden "
                  src="/assets/background_mobile.png"
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </div>
            <motion.div
              className="mt-[20vh] sm:mt-[0vh] sm:h-[80vh] sm:w-[600px]"
              initial={{ opacity: 0, x: '-50vh' }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              <div className=" flex justify-center sm:justify-start items-end sm:items-center h-[100vh] sm:h-[80vh] w-full sm:w-fit">
                <div className="flex-col w-fit lg:ml-60 sm:ml-12">
                  <div className="sm:w-fit sm:text-[100px] sm:h-[100px] w-full text-[70px] h-[80px] font-extrabold text-center text-[#484848]">
                    Enable
                  </div>
                  <div className="sm:w-fit sm:text-[100px] sm:h-[100px] sm:font-black w-full text-[70px] h-[80px] font-extrabold text-center text-[#484848]">
                    Upcycling
                  </div>
                  <div className="sm:mt-20 sm:text-xl sm:font-bold sm:pl-2 mt-10 text-lg font-semibold  text-center sm:text-left text-primary">
                    Cloths of the past , Oxygen for the future
                  </div>

                  <motion.div
                    className="mt-8 flex justify-center sm:justify-start"
                    initial={{ x: '-50vh', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  >
                    <Link href="/About">
                      <button className="py-2 px-8  text-lg font-semibold text-primary bg-accent1 rounded-xl">
                        Know More
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 md:max-w-5xl lg:max-w-7xl lg:px-8">
            <h2 className="flex justify-center text-4xl font-bold tracking-tight text-primary">
              Our Bags
            </h2>
            <div className="flex justify-center">
              <div className=" mt-0 sm:mt-10 w-9/12 md:w-9/12 grid grid-cols-1 gap-y-10 gap-x-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-10">
                {products.map((product) => (
                  <ProductItem
                    product={product}
                    key={product.slug}
                  ></ProductItem>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  const productsJSON = JSON.parse(JSON.stringify(products));
  await db.disconnect();
  return {
    props: {
      products: productsJSON,
    },
  };
}
