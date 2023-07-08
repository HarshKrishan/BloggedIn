"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";

import { redirect } from "next/navigation";
const Login = () => {
  const session = useSession();
  console.log(session);
  if (session.status == "loading") {
    return <div>loading...</div>;
  }
  if (session.status == "authenticated") {
    // const router = useRouter();
    redirect("/");
    // return <div>authenticated...</div>;
  }
  if (session.status == "unauthenticated") {
    // return <div>unauthenticated...</div>
    return (
      <div>
        <div className="m-20">
          <div className="flex justify-center">
            <div className="flex flex-col">
              <div className=" flex justify-center">
                <img
                  className="h-20 w-20"
                  src="Screenshot_2023-07-04_170715-removebg-preview.png"
                  alt="logo"
                />
              </div>

              <h2 className="text-3xl font-semibold m-4">
                Sign in to your account...
              </h2>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="flex flex-col p-10 border-2 drop-shadow-md">
                <label className="text-xl">Email address</label>
                <input
                  className="border-2 border-grey-500  rounded-md p-2"
                  type="email"
                />
                <label className="text-xl">Password</label>
                <input
                  className="border-2 border-grey-500 rounded-md p-2"
                  type="password"
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
                  Sign In
                </button>
                <hr className=""></hr>
                <div className="flex justify-center m-3 z-10">
                  <p className="font-semibold">Or continue with</p>
                </div>

                <div>
                  <button
                    onClick={() => signIn("google")}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
                  >
                    Login with Google
                  </button>
                  <button
                    onClick={() => signIn("github")}
                    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
                  >
                    Login with Github
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
