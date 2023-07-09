"use client";
import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import Link from "next/link";
import { redirect } from "next/navigation";

const Login = () => {
  const session = useSession();
  // console.log(session);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [register, setregister] = useState(false);
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");



  const handleRegister = async () => {
    if (password !== confirmpassword) {
      alert("passwords do not match");
      setpassword("");
      setconfirmpassword("");
    } else {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.message!=="user created successfully") {
        // console.log(res);

        alert(data.message);
      }else{
        alert("user created successfully");
        setusername("");
        setemail("");
        setpassword("");
        setconfirmpassword("");
        setregister(false);
        // redirect("/login");
      }
    }
  }
  
  

  const handleSignin = async () => {
    const res = await signIn("credentials", {
      name:username,
      email: email,
      password: password,
      redirect: false,
      callbackUrl:"/"
    });

    if (res.error) {
      alert(res.error);
    }

  };

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
    return !register ? (
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
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <label className="text-xl">Password</label>
                <input
                  className="border-2 border-grey-500 rounded-md p-2"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <button
                  onClick={handleSignin}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                >
                  Sign In
                </button>
                <div className="flex justify-center mb-2">
                  <p>
                    Do not have an account?{" "}
                    <span>
                      <button
                        onClick={() => setregister(true)}
                        className="font-semibold text-blue-700"
                      >
                        Sign Up
                      </button>
                    </span>
                  </p>
                </div>
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
    ) : (
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
                Register your account...
              </h2>
            </div>
          </div>

          <div className="">
            <div className="flex justify-center">
              <div className="flex flex-col p-10 border-2 drop-shadow-md">
                <label className="text-xl">Name</label>
                <input
                  className="border-2 border-grey-500  rounded-md p-2"
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />

                <label className="text-xl">Email address</label>
                <input
                  className="border-2 border-grey-500  rounded-md p-2"
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <label className="text-xl">Password</label>
                <input
                  className="border-2 border-grey-500 rounded-md p-2"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <label className="text-xl">Confirm Password</label>
                <input
                  className="border-2 border-grey-500 rounded-md p-2"
                  type="password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
                <button
                  onClick={handleRegister}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
                >
                  Register
                </button>
                <div className="flex justify-center mb-2">
                  <p>
                    Go back to{" "}
                    <span>
                      <button
                        onClick={() => setregister(false)}
                        className="font-semibold text-blue-700"
                      >
                        Login? 
                      </button>
                    </span>
                  </p>
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
