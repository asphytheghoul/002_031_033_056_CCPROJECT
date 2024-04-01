import React from "react";

import Button1 from "../components/Buttons/Button1";
import Image from "next/image";
import Layout from "../components/Layout";

export default function PageNotFount() {
  return (
    <>
      <div>
        <Layout title="404 Page Not found">
          <div>
            <Image
              className="-z-10 hidden sm:block"
              src="/assets/background_hero.png"
              layout="fill"
              objectFit="cover"
              alt=""
            />
            {/* <div className="pl-13 sm:hidden">
              <Image
                className="-z-10 block sm:hidden "
                src="/assets/background_mobile.png"
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </div> */}
            <div className=" flex justify-center sm:justify-start items-center sm:items-center h-[100vh] sm:h-[80vh] w-full sm:w-screen">
              <div className="flex-col w-fit lg:ml-60 sm:ml-12">
                <div className="sm:w-fit sm:text-[100px] sm:h-[100px] w-full text-[70px] h-[80px] font-extrabold text-center text-[#484848]">
                  Page
                </div>
                <div className="sm:w-fit sm:text-[100px] sm:h-[100px] sm:font-black w-full text-[70px] h-[80px] font-extrabold text-center text-[#484848]">
                  Not Found
                </div>
                <div className="sm:mt-20 sm:text-xl sm:font-bold sm:pl-2 mt-10 text-lg font-semibold  text-center sm:text-left text-primary">
                  The page you are looking for does not exist
                </div>
                <div className="mt-8 flex justify-center sm:justify-start">
                  <Button1>Go Back</Button1>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
