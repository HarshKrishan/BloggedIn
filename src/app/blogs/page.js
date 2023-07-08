"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Blog_post from "../blog_post";
import Link from "next/link";

import { redirect } from "next/navigation";
const Blogs = () => {
  const session = useSession();
  console.log(session);
  const [clicked, setClicked] = useState(false);
  const [writePost, setWritePost] = useState(false);
  
  
  const handleSignout = async () => {
    await signOut({
      callbackUrl: `${window.location.origin}`,
    });
    redirect("/");
  };
  return (
    <>
      <nav className="flex justify-between p-4 bg-slate-200 ">
        <div>
          <img className="h-10" src="logo.png" alt="logo" />
        </div>
        <ul className="flex space-x-8 justify-center">
          <li>
            <button
              className="font-semibold text-xl"
              onClick={() => setWritePost((prev) => !prev)}
            >
              write post
            </button>
          </li>
          <li>
            {/* <Link href={"/"} className="font-semibold text-xl">
              name
            </Link> */}
            <div>
              <button
                onClick={() => setClicked((prev) => !prev)}
                className="font-semibold text-xl"
              >
                Name
              </button>
              {clicked ? (
                <div className="absolute top-16 right-0 bg-slate-200 rounded-md">
                  <ul className="flex flex-col space-y-2 p-3 ">
                    <li>
                      <Link
                        href={"/"}
                        className="font-medium text-xl border-b-2 hover:border-b-black"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={"/"}
                        className="font-medium text-xl border-b-2 hover:border-b-black"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleSignout}
                        className="font-medium text-xl border-b-2 hover:border-b-black"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </li>
        </ul>
      </nav>

      {writePost ? (
        <div className="flex justify-center align-center relative">
          <div className="flex flex-col  bg-slate-300 text-white p-4 rounded-md absolute z-10">
            <div className="mb-3 text-black font-sans">
              <h2>Name</h2>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-black">
                Title
                <input type="text" name="title" className="mb-3 ml-3" />
              </label>
              <textarea
                name="content"
                placeholder="Share your thoughts..."
                className="ml-10"
              />
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap justify-evenly p-10 flex-shrink">
        <Blog_post data="hello" />
      </div>
      <footer className="p-10 bg-slate-200 bottom-0 fixed w-full">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">BloggedIn</h3>
          <div>
            <ul className="flex space-x-5">
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/"}>Careers</Link>
              </li>
              <li>
                <Link href={"/"}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Made with Love @2023</p>
        </div>
      </footer>
    </>
  );
};

export default Blogs;
