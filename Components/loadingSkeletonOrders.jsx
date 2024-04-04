import React from 'react';

export default function loading() {
  return (
    <>
      <div className="h-full w-full flex justify-center items-center">
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12" />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-24 mb-2.5" />
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-300" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-12" />
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
}
