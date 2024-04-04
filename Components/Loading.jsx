/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import Lottie from 'lottie-react';
// import loading from '../public/lottie/loading.json';

export default function Loading({ Word }) {
  return (
    <div className="fixed z-10 top-0 left-0 bg-shade3 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="sm:mt-2 sm:text-4xl sm:font-bold sm:pl-2 mt-2 text-4xl font-bold  text-center sm:text-center text-primary">
        {Word}
      </div>
      {/* <Lottie animationData={loading} /> */}
      <div className="sm:text-4xl sm:font-bold sm:pl-2  text-4xl font-bold  text-center sm:text-center text-primary">
        Cloths of the past , Oxygen for the future
      </div>
    </div>
  );
}
