"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Blog_post from "../blog_post";
const Profile = (request) => {
  console.log("request", request);
  const [posts, setposts] = useState([]);
  const [savedPosts, setsavedPosts] = useState([]);
  const params = request.searchParams;
  const [length,setlength]=useState(0);
  const [savedPostsLength, setsavedPostsLength] = useState(0);
  const [myPostsSelected, setMyPostsSelected] = useState(true);
  const [savedPostsSelected, setSavedPostsSelected] = useState(false);
  const fetchData = async () => {
    try {
      const url = "/api/myposts?name=" + params.username;
      const response = await fetch(url);
      const json = await response.json();
      // console.log("json", json);
      if(json.length>0){
        setlength(json.length);
      }
      await setposts(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log("posts", posts)
  return (
    <>
      <div className="flex">
        <nav className="h-screen bg-slate-200 w-1/6">
          <ul>
            <li className="flex justify-center my-5">
              <Link href="/blogs">
                <img className="h-10" src="logo.png" alt="logo" />
              </Link>
            </li>
            <li className="flex justify-center my-5 text-xl">
              {myPostsSelected ? (
                <button className="border-b-2 border-orange-400">
                  My Posts
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMyPostsSelected(true);
                    setlength(posts.length);
                    setSavedPostsSelected(false);
                  }}
                >
                  My Posts
                </button>
              )}
            </li>
            <li className="flex justify-center my-5 text-xl">
              {!savedPostsSelected ? (
                <button
                  onClick={() => {
                    setMyPostsSelected(false);
                    setlength(0);
                    setSavedPostsSelected(true);
                  }}
                >
                  Saved Posts
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMyPostsSelected(false);
                    setlength(0);

                  }}
                  className="border-b-2 border-orange-400"
                >
                  Saved Posts
                </button>
              )}
            </li>
            <li className="flex justify-center my-5 text-xl">
              <Link href="/blogs">
                <img className="h-10" src="arrow-left.png" alt="back" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="w-5/6 flex justify-center">
          <div className="flex flex-col ml-5 mt-10 w-5/6">
            {length > 0 ? (
              posts.map((post) => (
                <Blog_post
                  key={post._id}
                  username={post.username}
                  title={post.title}
                  content={post.content}
                  date={post.updatedAt}
                />
              ))
            ) : myPostsSelected ? (
              <h1 className="text-2xl">You haven't posted anything</h1>
            ) : (
              <h1 className="text-2xl">You haven't saved anything</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile