/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from 'react';
import Layout from '../components/Layout';
import Team from '../components/Team';

import { motion } from 'framer-motion';
import getScrollAnimation from '../utils/getScrollAnimation';
import ScrollAnimationWrapper from '../components/ScrollAnimationWrapper';

const Hero = ({
  listUser = [
    {
      name: 'Users',
      number: '390',
      icon: '/assets/Icon/heroicons_sm-user.svg',
    },
    {
      name: 'Schools',
      number: '20',
      icon: '/assets/Icon/gridicons_location.svg',
    },
    {
      name: 'Upcyclers',
      number: '50',
      icon: '/assets/Icon/bx_bxs-server.svg',
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <Layout>
      <>
        <div className="h-[50vh] flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
              Some of our numbers
            </h2>
          </motion.div>
          <div className="relative w-full flex">
            <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
              {listUser.map((listUsers, index) => (
                <motion.div
                  className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                  key={index}
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                >
                  <div className="flex mx-auto w-40 sm:w-auto">
                    <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                      <img src={listUsers.icon} className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl text-black-600 font-bold">
                        {listUsers.number}+
                      </p>
                      <p className="text-lg text-black-500">{listUsers.name}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </ScrollAnimationWrapper>
            <div
              className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
              style={{ filter: 'blur(114px)' }}
            ></div>
          </div>
        </div>
        <Team></Team>
      </>
    </Layout>
  );
};

export default Hero;
