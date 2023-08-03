"use client";

import Bg from "public/Bg.jpg";
import Link from "next/link";
import Card from "./card";

import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Footer from "./component/footer";
export default function Home() {
  const session = useSession();
  // console.log(session);
  if (session.status == "loading") {
    return <div>loading...</div>;
  }
  // if (session.status == "authenticated") {
  //   redirect("/blogs");
  // }

  return (
    <>
      <nav className="flex justify-between p-4 bg-slate-200 w-screen">
        <div>
          <img className="h-10 px-2" src="logo.png" alt="logo" />
        </div>
        <ul className="flex space-x-5 justify-center">
          <li>
            <Link href={"/login"} className="font-semibold text-xl">
              Sign In
            </Link>
          </li>
          <li>
            <button onClick={()=> alert("Sign in first to see the posts.")} className="font-semibold text-xl">
              Get Started
            </button>
          </li>
        </ul>
      </nav>
      <div
        className="h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 165, 0, 0.7), rgba(255, 69, 0, 0.7)),url(${Bg.src})`,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
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
        <div className="flex  bg-slate-100 justify-center flex-col w-screen">
          <div className="flex justify-center">
            <h2 className="p-10 font-bold text-5xl">Why choose us?</h2>
          </div>

          <div className="flex flex-wrap justify-evenly p-10 flex-shrink">
            <Card
              data="Share Your Voice"
              img="/19199716.jpg"
              desc="Unleash the power of your voice and create change. Engage in meaningful conversations, inspire others, and make a lasting impact. Share your voice and shape a better future."
              dir="normal"
            />
            <Card
              data="Learn And Grow"
              img="/20944387.jpg"
              desc="Embrace a path of continuous growth and learning. Expand your knowledge, acquire new skills, and unlock your true potential. Learn, evolve, and embark on a journey of endless possibilities."
              dir="reverse"
            />
            <Card
              data="Connect With Passionate Minds"
              img="/na_march_25.jpg"
              desc="Connect with passionate minds. Join a community that inspires collaboration and ignites creativity. Engage with like-minded individuals, exchange ideas, and fuel your passion together."
              dir="normal"
            />
            <Card
              data="Promote Your Personal Brand"
              img="/2101.i101.013.S.m004.c13.self promotion branding isometric.jpg"
              desc="Promote your personal brand. Unleash your unique identity and captivate your audience. Build your online presence, showcase your talents, and open doors to new opportunities."
              dir="reverse"
            />
            <Card
              data="Supportive Community"
              img="/5498791.jpg"
              desc="Find solace in a supportive community. Connect with kindred spirits who uplift and empower. Share, grow, and thrive together."
              dir="normal"
            />
          </div>
        </div>
      </div>
      <Footer page="home"/>
    </>
  );
}
