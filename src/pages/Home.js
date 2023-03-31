import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slice/cartSlice";
import { Link } from "react-router-dom";
import pb from "../lib/pocketbase";
import Auth from "./Auth";
const Templates = () => {
  // Templates state array
  const [templates, setTemplates] = useState([]);
  // Fetcht alle templates uit de pocketbase database van de collection 'templates', sorteert deze op de laatst geupdate en update de templates state.
  useEffect(() => {
    const fetchTemplates = async () => {
      const records = await pb.collection("templates").getFullList({
        sort: "-updated",
      });
      setTemplates(records);
    };
    fetchTemplates();
  }, []);
  const dispatch = useDispatch();
  // Neemt product aan als parameter en dispatcht de addToCart action met het product en een quantity van 1.
  const handleAddToCart = (product) => {
    const { id, name, price, thumbnail } = product;
    const item = { id, name, price, thumbnail };
    dispatch(addToCart({ item, quantity: 1 }));
  };

  const isLoggedIn = pb.authStore.isValid;


  if (isLoggedIn) {
  return (
  <>
  {/* Als de templates state array leeg is laat dan een loading spinner zien */}
  {templates.length === 0 && (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span className="text-[#4D4D4D] font-bold text-lg">Loading...</span>
      </div>
    </div>
  )}

    <div className="w-full mx-auto">
      <div className="my-10 w-8/12 mx-auto 2xl:gap-8 xl:gap-10 justify-center  grid gap-0 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4">
        {/* Mapt door de templates state array en laat de templates zien */}
        {templates.map((t) => (
          <div className=" flex flex-col rounded-md max-w-[320px] sm:mx-auto  mt-12" key={t.id} >
            <img className="w-[320px] h-[162.7px] rounded-md" src={t.thumbnail} alt={t.name} />
            <div className="w-full px-4 mt-4">
              <span className="font-bold text-sm leading-[21px] text-[#4D4D4D]">
                {t.name}
              </span>
              <div className="flex mt-3 h-10 w-full">
                <span className="mt-auto text-lg text-[#6CA12B] font-bold">
                  {t.price === 0 ? (
                    <span>GRATIS</span>
                  ) : (
                    <span>€{t.price}</span>
                  )}
                </span>
                {/* Knop die de handleAddToCart functie aanroept met het product als parameter */}
                <button onClick={() => handleAddToCart(t)} className="focus:bg-green-200 w-10 h-10 border border-[#ccc] rounded-sm ml-auto mr-1 duration-500 hover:bg-[#ccc] hover:text-[#444444]" >
                  <svg className="my-auto mx-auto" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg>
                </button>
                {/* Link naar de preview pagina van de template op basis van het id */}
                <Link to={`/templates/${t.id}`}>
                  <button className="h-10 w-20 border font-bold text-xs text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white duration-500 rounded-sm">
                    Preview
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  );
 }
 return(
  <Auth/>
 )
};
export default Templates;
