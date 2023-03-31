import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../images/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  {
    /* Pathname is de huidige locatie van de gebruiker */
  }
  const pathName = window.location.pathname;
  {
    /* numberOfItems is de lengte van de array met items in de winkelwagen */
  }
  const numberOfItems = useSelector((state) => state.cart.list.length);
  return (
    <>
      <nav className="w-full lg:px-40 md:px-20 px-4 h-16 flex justify-between text-slate-800 font-semibold text-lg border-b border-gray-200">
        <Link className="my-auto" to="/">
          <img className="h-10 my-auto" src={logo} alt="Logo" />
        </Link>
        <ul className="xl:flex hidden ">
          <li style={{ color: pathName === "/" ? "#4338CA" : "#374151" }} className="my-auto text-gray-700 text-sm font-semibold hover:text-blue-700" >
            <Link to="/" className="mb-10">
              Thema's
            </Link>
          </li>
          <li style={{ color: pathName === "/services" ? "#4338CA" : "#374151" }} className="mx-10 my-auto text-gray-700 text-sm font-semibold hover:text-blue-700" >
            <Link to="/services" className="mb-10">
              Services
            </Link>
          </li>
          <li style={{ color: pathName === "/about" ? "#4338CA" : "#374151" }} className="mr-10 my-auto text-gray-700 text-sm font-semibold hover:text-blue-700" >
            <Link to="/about" className="mb-10">
              Over ons
            </Link>
          </li>
          <li style={{ color: pathName === "/help" ? "#4338CA" : "#374151" }} className="my-auto text-gray-700 text-sm font-semibold hover:text-blue-700" >
            <Link to="/help" className="mb-10">
              Help
            </Link>
          </li>
        </ul>
        {/* Button die de "open" state van het mobiele menu op true of false zet */}
        <button onClick={() => setOpen((prevState) => !prevState)} className="xl:hidden flex my-auto ring ring-gray-50 rounded-sm p-1" >
          {open ? (
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
              <path fillRule="evenodd" clipRule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" ></path>
            </svg>
          ) : (
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" >
              <path fillRule="evenodd" clipRule="evenodd" d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" ></path>
            </svg>
          )}
        </button>
        <div className="my-auto flex">
          <Link to="/cart" className="flex w-10 my-auto">
            <svg className="my-auto ml-1" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
            </svg>
            {numberOfItems > 0 && (
              <span className="bg-red-500 w-[20px] h-[20px] translate-x-[90%] -translate-y-[55%] text-center my-auto absolute rounded-full text-sm text-white">
                <p className="my-auto">{numberOfItems}</p>
              </span>
            )}
          </Link>
          <Link to="/profile" className="md:ml-8 ml-3 my-auto">
            <svg className="my-auto" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" >
              <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" ></path>
            </svg>
          </Link>
        </div>
      </nav>
      {/* Menu die getoont word wanneer de open state open true staat */}
      {open && (
        <div className="md:hidden bg-white h-[100vh]">
          <div className="flex flex-col">
            <ul>
              <li style={{ color: pathName === "/" ? "#4338CA" : "#374151" }} className="border-b border-gray-300 pl-4 py-6 my-auto text-gray-700 font-semibold hover:text-blue-700" >
                <Link to="/" className="mb-10">
                  Thema's
                </Link>
              </li>
              <li style={{ color: pathName === "/services" ? "#4338CA" : "#374151"}} className="border-b border-gray-300 pl-4 py-6  my-auto text-gray-700 font-semibold hover:text-blue-700" >
                <Link to="/services" className="mb-10">
                  Services
                </Link>
              </li>
              <li style={{ color: pathName === "/about" ? "#4338CA" : "#374151" }} className="border-b border-gray-300 pl-4 py-6  my-auto text-gray-700 font-semibold hover:text-blue-700" >
                <Link to="/about" className="mb-10">
                  Over ons
                </Link>
              </li>
              <li style={{ color: pathName === "/help" ? "#4338CA" : "#374151" }} className="border-b border-gray-300 pl-4 py-6 my-auto text-gray-700 font-semibold hover:text-blue-700" >
                <Link to="/help" className="mb-10">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
