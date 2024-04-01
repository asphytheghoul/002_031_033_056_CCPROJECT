import Link from 'next/link';
import React from 'react';

export default function DropdownLink(props) {
  let { href, children } = props;
  return (
    <Link href={href}>
      <div>{children}</div>
    </Link>
  );
}
