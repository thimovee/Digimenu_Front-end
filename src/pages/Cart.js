import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import pb from "../lib/pocketbase";
import { Link } from "react-router-dom";
import { removeAllItems, removeItem } from "../redux/slice/cartSlice";
export default function Cart() {
  // Haalt de userID op uit de authStore om deze te gebruiken in de addTemplatesToUser functie
  const userID = pb.authStore.model.id;
  // Haalt de cart state op van useSelector
  const cart = useSelector((state) => state.cart);
  // Haalt de dispatch functie op van useDispatch
  const dispatch = useDispatch();
  // State die bepaalt of de popup zichtbaar is
  const [showPopup, setShowPopup] = useState(false);
  // Totaalprijs van de items in de cart
  const totalPrice = cart.list.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Voegt de gekochte thema's toe aan de user in de database
  const addTemplatesToUser = async () => {
    try {
      const templateIds = cart.list.map((item) => item.id);
      const data = { templates: templateIds };
      await pb.collection("users").update(userID, data);
      setShowPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* Ontvangt id als parameter en roept de dispatch removeAllItems functie op vanuit de cartSlice*/
  }
  const clearCart = () => {
    dispatch(removeAllItems());
    setShowPopup(false);
  };
  {
    /* Ontvangt id als parameter en roept de dispatch removeItem functie op vanuit de cartSlice*/
  }
  const removeItemFromCart = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <>
      {/* Popup die tevoorschijn komt nadat de gebruiker een thema koopt */}
      {showPopup && (
        <div className="absolute  w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
          <div className="bottom-28 right-10 absolute bg-blue-50 p-6  rounded-md rounded-l-none shadow-lg border-l-[5px] border-green-500">
            <h2 className="text-lg font-semibold mb-4">
              Bedankt voor je aankoop!
            </h2>
            <p className="mb-4">Je hebt de volgende thema's gekocht:</p>
            <ul>
              {cart.list.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
            {/* Knop die de popup sluit en de cart state naar "null" zet */}
            <button className="absolute -top-4 -right-4 p-3 bg-red-600 font-semibold text-white  rounded-full" onClick={clearCart} >
              <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 15 15" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" >
                <path fillRule="evenodd" clip-rule="evenodd" d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="my-20">
        {/* Wordt weergegeven als het aantal items in de winkelmand 0 is */}
        {cart.list.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen -mt-32">
            <span className="text-2xl font-semibold">
              Je winkelmand is leeg{" "}
            </span>
            <Link to="/" className="bg-blue-700 hover:bg-indigo-700 duration-700 text-white font-semibold text-lg py-2 px-4 flex rounded-full mt-4" >
              Terug naar Thema's
              <svg className="ml-4 my-auto" stroke="currentColor" fill="currentColor" strokeWidth="0.9px" viewBox="0 0 16 16" height="22px" width="22px" xmlns="http://www.w3.org/2000/svg" >
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
              </svg>
            </Link>
          </div>
        ) : (
          // Wordt weergegeven als de gebruiker een of meerdere items in zijn winkelmand heeft
          <div className="w-full lg:w-10/12  flex lg:flex-row flex-col-reverse mx-auto">
            <div className=" lg:mx-none mx-auto">
              {cart?.list.map((item) => (
                <div className="lg:mx-none mx-auto bg-[#FEFEFE] w-[425px] lg:w-[550px] xl:w-[600px] mr-10 flex rounded-[7px] my-12 justify-between shadow-md" key={item.id} >
                  <img className="rounded-md w-[168px] h-[93px] my-4 ml-4" src={item.thumbnail} />
                  <div className="flex flex-col  mr-auto ml-7">
                    <span className="leading-[21px] text-[#4D4D4D] mt-4 font-bold">
                      {item.name}
                    </span>
                    <span className="font-semibold text-lg text-green-600 mt-auto mb-4">
                      {item.price === 0 ? (
                        <span>GRATIS</span>
                      ) : (
                        <span>€{item.price}</span>
                      )}
                    </span>
                  </div>
                  <Link target="_blank" className="mt-auto mb-4" to={`/templates/${item.id}`} >
                    <button className="h-10 w-20 border font-bold text-xs text-[#1E3A8A] border-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white duration-500 rounded-sm">
                      Preview
                    </button>
                  </Link>
                  {/* Voert removeItemFromCart function uit en geeft id mee als parameter */}
                  <button onClick={() => removeItemFromCart(item.id)} className="-mr-4 -mt-2  bg-red-500 h-10 w-10 rounded-full font-semibold text-white" >
                    <svg className="m-auto" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="lg:w-[500px] w-[415px] bg-[#FEFEFE] shadow-xl flex flex-col h-64 mt-12 rounded-lg  lg:mx-none mx-auto">
              <div className="flex justify-between mt-6 px-6 mb-6">
                <span className="font-semibold text-lg text-[#4D4D4D]">
                  Totaal
                </span>
                <span className="font-semibold text-[#65A30D] text-lg">
                  {totalPrice === 0 ? (
                    <span>GRATIS</span>
                  ) : (
                    <span>€{totalPrice}</span>
                  )}
                </span>
              </div>
              <div className="ml-7 text-[#4D4D4D] font-medium">
                {cart?.list.length === 1 ? (
                  <span>{cart?.list.length} Item</span>
                ) : (
                  <span>{cart?.list.length} Items</span>
                )}
              </div>
              {/* Thema's die in de winkelmand zitten worden toegevoegd aan de gebruiker zijn account templates als de gebruiker op deze knopt drukt */}
              <button onClick={addTemplatesToUser} className="bg-[#1E3A8A] text-lg text-white mx-auto mt-auto mb-10 py-2 px-10 font-semibold rounded-full " >
                Verder naar betaling
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
