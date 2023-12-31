"use client";
import { signOut } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { useSession,getSession } from "next-auth/react";
import Blog_post from "../blog_post";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Footer from "../component/footer";
import UserContext from "@/context/userContext";
import Image from "next/image";

const Blogs = () => {
  const session = useSession();
  console.log("session",session.data);
  const context = useContext(UserContext);
  console.log("context",context);
  const datafromcontext = context.user;
  const user = datafromcontext.username;
  const userid = datafromcontext._id;
  useEffect(() => {
    // window.location.reload();
    fetchData();
  }, []);
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [writePost, setWritePost] = useState(false);
  
  const [posts, setposts] = useState([]);
  const [newposttitle, setnewposttitle] = useState("");
  const [newpostcontent, setnewpostcontent] = useState("");
  const [customlogin, setcustomlogin] = useState(false);
  // console.log("user",session.data.user.name);
  
  // const fetchUserData = async () => {
  //   if(!customlogin){
  //     setuser(session.data.user.name);
  //   }
    
  //   const email = session.data.user.email;
  //   const password = user;
  //   const result = await fetch("/api/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ username:user, email:email, password:password }),
  //   });
  //   try {
  //     const url = "/api/signup/?email=" + session.data.user.email;
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     // console.log("json", json[0]);
  //     await setuser(json[0].username);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async () => {
    
    try {
      const url = "/api/posts";
      const response = await fetch(url);
      const json = await response.json();
      // console.log("json", json);
      await setposts(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  
  const handlepost = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username:user,title: newposttitle, content: newpostcontent, userid:userid}),
      
    });
    const data = await res.json();
    console.log(data);
    setposts((prev) => [...prev,data]);
    setnewposttitle("");
    setnewpostcontent("");
    setWritePost((prev) => !prev);
    fetchData();
  };

  const handleSignout = async () => {
    await signOut({
      callbackUrl: `${window.location.origin}`,
    });
    // redirect("/");
  };

  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username:user}),
    });
    console.log("res",res)
    if(res.status===200){
      router.push("/");
    }
  } 
  return (
    <>
      <nav className="flex justify-between p-4 bg-slate-200 sticky top-0">
        <div>
          <Image
            width={40}
            height={10}
            className="h-10"
            src="/logo.png"
            alt="logo"
          />
        </div>
        <ul className="flex space-x-8 justify-center">
          <li>
            <button
              className="font-semibold text-xl"
              onClick={() => setWritePost((prev) => !prev)}
            >
              <Image
                width={70}
                height={70}
                className="h-7"
                src="/edit-regular.svg"
                alt="write"
              />
            </button>
          </li>
          <li>
            {/* <Link href={"/"} className="font-semibold text-xl">
              name
            </Link> */}
            <div>
              <button
                onClick={() => setClicked((prev) => !prev)}
                className="font-semibold text-xl mr-4"
              >
                {user}
                {/* name */}
              </button>
              {clicked ? (
                <div className="absolute top-16 right-0 bg-slate-200 rounded-md">
                  <ul className="flex flex-col space-y-2 p-3 ">
                    <li>
                      <Link
                        href={{
                          pathname: "/profile",
                          query: { username: user, userid: userid },
                        }}
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
                        onClick={logout}
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
              <h2>{user}</h2>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-black">
                Title
                <input
                  type="text"
                  name="title"
                  className="mb-3 ml-3"
                  value={newposttitle}
                  onChange={(e) => setnewposttitle(e.target.value)}
                />
              </label>
              <textarea
                name="content"
                placeholder="Share your thoughts..."
                className="ml-10 text-black"
                value={newpostcontent}
                onChange={(e) => setnewpostcontent(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-slate-200 text-black rounded-md p-2 mt-3 hover:bg-white mx-3"
                onClick={() => setWritePost((prev) => !prev)}
              >
                Cancel
              </button>
              <button
                className="bg-slate-200 text-black rounded-md p-2 mt-3 hover:bg-white"
                onClick={handlepost}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="flex flex-wrap justify-evenly p-10 mb-28 flex-shrink">
        {posts.map((post) => (
          <Blog_post
            userid={userid}
            id={post._id}
            key={post._id}
            username={post.username}
            title={post.title}
            content={post.content}
            date={post.updatedAt}
          />
        ))}
      </div>
      <Footer page="blogs" />
    </>
  );
};

export default Blogs;
