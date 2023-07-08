"use client";

import Image from 'next/image'
import Link from 'next/link'
import Card from './card';

import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
export default function Home() {

  const session = useSession();
  console.log(session);
  if (session.status == "loading") {
    return <div>loading...</div>;
  }
  if (session.status == "authenticated") {
    
    redirect("/blogs");

  }


  return (
    <>
      <nav className="flex justify-between p-4 bg-slate-200 ">
        <div>
          <img className="h-10" src="logo.png" alt="logo" />
        </div>
        <ul className="flex space-x-5 justify-center">
          <li>
            <Link href={"/login"} className="font-semibold text-xl">
              Sign In
            </Link>
          </li>
          <li>
            <Link href={"/about"} className="font-semibold text-xl">
              Get Started
            </Link>
          </li>
        </ul>
      </nav>
      <div className="h-screen bg-orange-400">
        <div>
          <h1 className="text-8xl p-10 font-bold w-5">
            Read anywhere, anytime
          </h1>
          <p className="p-10 text-2xl font-medium">
            Share, Learn, and Connect with Passionate Minds
          </p>
        </div>
      </div>
      <div>
        <div className="flex  bg-slate-100 flex-col ">
          <h2 className="p-10 font-bold text-5xl">Why choose us?</h2>
          <div className="flex flex-wrap justify-evenly p-10 flex-shrink">
            <Card data="Share Your Voice" />
            <Card data="Learn And Grow" />
            <Card data="Connect With Passionate Minds" />
            <Card data="Promote Your Personal Brand" />
            <Card data="Supportive Community" />
          </div>
        </div>
      </div>
      <footer className="p-10 bg-slate-200 ">
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
}
