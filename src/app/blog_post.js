"use client";
import Image from "next/image";

import React,{useState} from "react";

const Blog_post = (params) => {
  const[save,setsave]=useState(false);
  const togglesave = async ()=>{
    setsave(!save);
    console.log("id",params.id);
    console.log("userid",params.userid);
    try {
      const url = "/api/savedposts";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postid: params.id, userid: params.userid }),
      });
      const json = await response.json();
      console.log("json", json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const mongodbDate = new Date(params.date);
  const formattedDate = mongodbDate.toLocaleString();
  return (
    <>
      <div className="shadow-sm border-b-2 w-2/3 pt-2">
        <div className="flex justify-between">
          <div>
            <p className="px-2 text-xl font-serif">{params.username}</p>
            <p className="px-2 text-sm font-light">{formattedDate}</p>
          </div>
          <div>
            <button className="" onClick={togglesave}>
              {!save ? (
                <Image
                  height={40}
                  width={40}
                  className="h-10"
                  src="/save_tag_icon.png"
                  alt="save post"
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  className="h-10"
                  src="/save_tag_icon_dark.png"
                  alt="un-save post"
                />
              )}
            </button>
          </div>
        </div>
        <div>
          <h1 className="pt-2 px-2 font-bold ">{params.title}</h1>
          <p className="pt-1 px-2 pb-4">{params.content}</p>
        </div>
      </div>
    </>
  );
};

export default Blog_post;
