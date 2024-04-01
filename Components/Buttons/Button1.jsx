import Link from 'next/link';
import React from 'react';

export default function Button({ children }) {
  return (
    <div>
      <Link href="/">
        <button className="py-2 px-8  text-xl font-medium text-primary bg-accent1 rounded-xl">
          {children}
        </button>
      </Link>
    </div>
  );
}
