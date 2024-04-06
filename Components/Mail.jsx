/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Lottie from 'lottie-react';
import mail from '../public/lottie/mail.json';

export default function Loading() {
  return <Lottie className="w-[400px] h-[500px]" animationData={mail} />;
}
