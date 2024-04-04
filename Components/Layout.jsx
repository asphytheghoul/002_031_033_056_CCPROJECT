import Head from 'next/head';
import React from 'react';
// import Footer from './Footer';
import Nav from './Nav';
// import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>
          {title ? title + '-Enable Upcycling' : 'Enable Upcycling'}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
      <div className="z-[800]">
        <Nav></Nav>
        {/* <Navbar></Navbar> */}
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}
