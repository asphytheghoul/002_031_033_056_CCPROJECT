import React from 'react';

export default function loading() {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <div
          role="status"
          className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
        >
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-32 mb-2.5" />
          <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-300" />
          <div className="flex items-baseline mt-4 space-x-6">
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-300" />
            <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-300" />
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-300" />
            <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-300" />
            <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-300" />
            <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-300" />
            <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-300" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
