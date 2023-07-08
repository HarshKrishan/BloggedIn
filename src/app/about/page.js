import React from 'react'
import Link from 'next/link'
const page = () => {
  return (
    <>
      <div>about page</div>

      <Link href={"/"}>Go to home page</Link>
    </>
  );
}

export default page