import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import pb from '../lib/pocketbase';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice/cartSlice';

const TemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const dispatch = useDispatch();

  {/* Fetcht een template vanuit pocketbase database op basis van de template id en zet deze als de template state. 
  Functie wordt uitgevoerd elke keer dat het id veranderd bij bijvoorbeeld een nieuwe paginaweergave.
*/}
  useEffect(() => {
    const fetchTemplate = async () => {
      const record = await pb.collection('templates').getOne(id);
      setTemplate(record);
    };
    fetchTemplate();
  }, [id]);

  {/* Als de template state nog niet is ingeladen, wordt er een loading indicator weergegeven. */}
  if (!template) {
    return <div>Loading...</div>;
  }
  {/* Functie die product mee krijgt als parameter en haalt daarvan het id, naam, prijs en thumbnail op en voegt deze toe aan de winkelmand  */}
  const handleAddToCart = (product) => {
    const { id, name, price, thumbnail } = product;
    const item = { id, name, price, thumbnail };
    dispatch(addToCart({ item, quantity: 1 }));
  };

  return (
    <div className="min-h-screen w-2/3 mx-auto flex  md:flex-row  flex-col mt-20">
        <div className="md:w-1/2 w-full">
            <img className="md:w-[750px] w-[500px] md:mt-0 mt-10 rounded-lg " src={template.thumbnail} alt={template.name} />
            <div className="max-w-[550px] mx-auto mt-10">{template.description}</div>
        </div>
        <div className="w-1/3 md:ml-16 flex flex-col md:mt-0 mt-10 ml-0">
            <span className="text-2xl font-semibold">{template.name}</span>
            <span className="font-semibold text-[#65A30D] text-lg w-full mt-6 border-b border-gray-400 pb-8">{template.price === 0 ? <span>GRATIS</span> : <span>€{template.price}</span>}</span>
            <div className="mt-8 text-[#4D4D4D]">
                <div className="flex mt-2">
                    <svg className="my-auto mr-4"stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path></svg><span>Regelmatig geüpdate</span>
                </div>
                <div className="flex mt-2">
                    <svg className="my-auto mr-4"stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path></svg><span>Gratis service na aankoop</span>
                </div>
                <div className="flex mt-2">
                    <svg className="my-auto mr-4"stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path></svg><span>Perfect voor frietzaken</span>
                </div>
                <div className="flex mt-2">
                    <svg className="my-auto mr-4"stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"></path></svg><span>Veelzijdig & aanpasbaar</span>
                </div>
            </div>
            {/* Knop om template toe te voegen aan winkelmand */}
            <button onClick={() => handleAddToCart(template)}className="mt-12 font-semibold text-white bg-[#1E3A8A] rounded-full w-80 py-3">Toevoegen aan winkelmand</button>
        </div>
    </div>
  );
};

export default TemplateDetails;