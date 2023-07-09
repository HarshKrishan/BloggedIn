import React from "react";

const Card = (params) => {
  return params.dir === "normal" ? (
    <div className="flex justify-center">
      <div className="flex bg-slate-100 p-4 rounded text-2xl m-8 font-serif w-2/3 border-b-2 shadow-sm border-orange-400">
        <div>
          <h2 className="mr-12 font-bold mb-3">{params.data}</h2>
          <p className="font-mono text-base ">{params.desc}</p>
        </div>

        <img
          className="h-24 w-auto rounded-lg shadow-sm"
          src={params.img}
          alt="logo"
        />
      </div>
    </div>
  ) : (
    <div className="flex justify-center ">
      <div className="flex bg-slate-100 p-4 rounded text-2xl m-8 font-serif w-2/3 border-b-2 shadow-sm flex-row-reverse border-orange-400">
        <div>
          <h2 className="ml-12 font-bold mb-3">{params.data}</h2>
          <p className=" ml-12 font-mono text-base ">{params.desc}</p>
        </div>

        <img
          className="h-24 w-auto rounded-lg shadow-sm"
          src={params.img}
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Card;
