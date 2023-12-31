"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Blog_post from "../blog_post";
import Image from "next/image";
const Profile = (request) => {
  console.log("request", request);
  const [posts, setposts] = useState([]);
  const [savedPosts, setsavedPosts] = useState([]);
  const params = request.searchParams;
  const [length,setlength]=useState(0);
  const [savedPostsLength, setsavedPostsLength] = useState(0);
  const [myPostsSelected, setMyPostsSelected] = useState(true);
  const [savedPostsSelected, setSavedPostsSelected] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/myposts?userid=" + params.userid;
        const response = await fetch(url);
        const json = await response.json();
        console.log("json", json);
        if (json.length > 0) {
          setlength(json.length);
        }
        await setposts(json);

        const url2 = "/api/savedposts?userid=" + params.userid;
        const response2 = await fetch(url2);
        const json2 = await response2.json();
        console.log("json2", json2);
        if (json2.length > 0) {
          setsavedPostsLength(json2.length);
        }
        await setsavedPosts(json2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log("posts", posts)
  console.log("savedPosts", savedPosts);
  savedPosts.map((post) => {
    
    console.log("post",post);
    
  });

  return (
    <>
      <div className="flex ">
        <nav className="h-screen bg-slate-200 w-1/6 ">
          <ul className="">
            <li className="flex justify-center my-5">
              <Link href="/blogs">
                <Image height={10} width={40} className="h-10" src="/logo.png" alt="logo" />
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
        <div className="w-5/6 flex justify-center ">
          <div className="flex flex-col ml-5 my-10 w-5/6 h-4/5 overflow-auto no-scrollbar">
            {/* {length > 0 ? (
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
            )} */}
            {myPostsSelected ? (
              length > 0 ? (
                posts.map((post) => (
                  <Blog_post
                    key={post._id}
                    username={post.username}
                    title={post.title}
                    content={post.content}
                    date={post.updatedAt}
                  />
                ))
              ) : (
                <h1 className="text-2xl">You haven&apos;t posted anything</h1>
              )
            ) : (
              savedPostsLength > 0 ? (
                savedPosts.map((post) => (
                  <Blog_post
                    key={post._id}
                    username={post.username}
                    title={post.title}
                    content={post.content}
                    date={post.updatedAt}
                  />
                ))
              ) : (
                <h1 className="text-2xl">You haven&apos;t saved anything</h1>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile