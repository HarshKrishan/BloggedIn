import React from "react";

const Card = (params) => {
  return (
    <>
      <div className=" bg-slate-300 p-4 rounded text-2xl m-8 font-serif">
        <p>{params.data}</p>
        <img className="h-10" src="logo.png" alt="logo" />
      </div>
    </>
  );
};

export default Card;
