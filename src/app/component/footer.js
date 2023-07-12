import React from 'react'

const Footer = (params) => {
  return params.page == "home" ? (
    <>
      <footer className="p-10 bg-slate-200">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">BloggedIn</h3>
          <div>
            <ul className="flex space-x-5">
              <li>
                <button>About</button>
              </li>
              <li>
                <button>Careers</button>
              </li>
              <li>
                <button>Contact</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Made with Love @2023</p>
        </div>
      </footer>
    </>
  ) : (
    <>
      <footer className="p-10 bg-slate-200 bottom-0  w-full">
        <div className="flex justify-between">
          <h3 className="font-bold text-2xl">BloggedIn</h3>
          <div>
            <ul className="flex space-x-5">
              <li>
                <button>About</button>
              </li>
              <li>
                <button>Careers</button>
              </li>
              <li>
                <button>Contact</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between">
          <p>Made with Love @2023</p>
        </div>
      </footer>
    </>
  );
}

export default Footer