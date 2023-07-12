import Link from "next/link";
import React from "react";

const Blog_post = (params) => {
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
            <button className="">
              <img  className="h-10" src="save_tag_icon.png" alt="save post" />
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
