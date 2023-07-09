import React from "react";

const Blog_post = (params) => {
  const mongodbDate = new Date(params.date);
  const formattedDate = mongodbDate.toLocaleString();
  return (
    <>
      <div className="shadow-sm border-b-2 w-2/3 pt-2">
        <div className="flex">
          <p className="pr-2 text-xl font-serif">{params.username}</p>
          <p className="pt-1 text font-light">{formattedDate}</p>
        </div>
        <div>
            <h1 className="pt-2 font-semibold ">{params.title}</h1>
            <p className="pt-1 pb-4">{params.content}</p>
        </div>
      </div>
    </>
  );
};

export default Blog_post;
