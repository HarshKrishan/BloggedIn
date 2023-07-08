import React from "react";

const Blog_post = (params) => {
  return (
    <>
      <div className="shadow-sm border-b-2 w-2/3">
        <div className="flex">
          <p className="p-2 text-xl font-light">Author name</p>
          <p className="p-2 text-xl font-light">date</p>
        </div>
        <div>
            <h1 className="text-xl p-2 font-semibold ">Blog title</h1>
            <p className="p-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Animi, eveniet iure fugit iste quo vitae officiis. Deserunt rerum aliquam, nisi dolor eligendi facere dolore dolorum asperiores esse soluta molestias tempore!</p>
        </div>
      </div>
    </>
  );
};

export default Blog_post;
