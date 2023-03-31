import { useState, useEffect } from 'react';
import {useForm } from 'react-hook-form';
import pb from '../lib/pocketbase';
import useLogout from '../hooks/useLogout';
export default function Auth(){
    // Import logout hook van hooks/useLogout.js
    const logout = useLogout(); 
    const { register, handleSubmit, reset} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    // Check of de gebruiker is ingelogd
    const isLoggedIn = pb.authStore.isValid;
    // Index state voor het navigeren van de sidebar
    const [index, setIndex] = useState(0);
    // Templates van de user ophalen
    const [templates, setTemplates] = useState([]);
    useEffect(() => {
        const fetchTemplates = async () => {
            const records = await pb.collection('templates').getFullList({
                sort: '-updated',
            });
            setTemplates(records);
        };
        fetchTemplates();
    }, []);
    
    async function login(data){
        setIsLoading(true);
        try{
            await pb.collection("users").authWithPassword(data.email,data.password);
        } catch(e) {
            alert("Verkeerd wachtwoord of email!")
        }
        setIsLoading(false);
        reset();
    }
    
    // Als de gebruiker ingelogd is krijgt hij dit te zien
    if(isLoggedIn)
    return (
    <>
    <div className="flex">
        <div className="w-[75px] min-h-screen border-r-2 border-gray-200">
            <div className="flex flex-col mt-10 max-w-[225px] mx-auto">
                {/* Sidebar navigatie */}
                <button onClick={()=> setIndex(0)} style={{backgroundColor: index === 0 ? "#1c4ed6" : "#ffffff",color: index === 0 ? "#FFFFFF" : "#000000" }} className="mx-auto w-10 h-10 rounded-full text-slate-900 mt-4"><svg className="my-auto mx-auto" stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path></svg></button>
                <button onClick={()=> setIndex(1)} style={{backgroundColor: index === 1 ? "#1c4ed6" : "#ffffff",color: index === 1 ? "#FFFFFF" : "#000000" }} className="mx-auto w-10 h-10 rounded-full text-slate-900 mt-4"><svg className="my-auto mx-auto" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path></svg></button>
                <button onClick={logout} className="bg-red-600  rounded-full font-semibold text-white flex mt-10 py-3 w-10 h-10 mx-auto"><div className="my-auto mx-auto font-semibold rounded-md cursor-pointer"><svg className="my-auto mx-auto"stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="20px" width="20px" xmlns="http://www.w3.org/2000/svg"><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg></div></button>
            </div>
        </div>
        <div className="flex w-10/12 min-h-screen">
        <div className="flex flex-col mt-10 min-w-screen ml-8">
            {index == 0 ? <>
            <div className="text-4xl text-slate-900 font-extrabold border-b-2 border-gray-200 pb-16">Persoonlijke Informatie</div>
            <div className="font-semibold py-2 rounded-xl ">
                <div className="flex flex-col  w-[1000px] rounded-xl h-[800px]">
                    <div className="flex flex-col mt-10">
                        {/* Laat alle data van de gebruiker zien alleen niet zijn wachtwoord */}
                        <div className="text-2xl">Profiel</div>
                        <div className="flex mt-6 ">
                            <div className="flex flex-col w-1/3">
                                <label className="text-[#272727]">Voornaam</label>
                                <input defaultValue={`${pb.authStore.model.voornaam}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            </div>
                            <div className="flex flex-col w-1/3 ml-10">
                                <label className="text-[#272727]">Achternaam</label>
                                <input defaultValue={`${pb.authStore.model.achternaam}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            </div>
                        </div>
                        <div className="flex mt-6">
                        <div className="flex flex-col w-1/3">
                            <label className="text-[#272727]">Email</label>
                            <input defaultValue={`${pb.authStore.model.email}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            <div className="mt-2 text-md text-slate-600">
                                <a href={`http://localhost:8090/_/#/auth/confirm-email-change/${pb.authStore.token}`}>E-mailadres veranderen.</a>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/3 ml-10">
                            <label className="text-[#272727]">Wachtwoord</label>
                            <input defaultValue={`${pb.authStore.model.username}`} type="password" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            <div className="mt-2 text-md text-slate-600">
                                <a href={`http://localhost:8090/_/#/auth/confirm-password-reset/${pb.authStore.token}`}>Wachtwoord veranderen.</a>
                            </div>
                        </div>
                        </div>
                        <div className="text-2xl mt-20">Persoonlijke Informatie</div>
                        <div className="flex flex-col">
                            <div className="flex mt-6">
                                <div className="flex flex-col w-1/3">
                                    <label className="text-[#272727]">Emailadres</label>
                                    <input defaultValue={`${pb.authStore.model.email}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                                </div>
                            <div className="flex flex-col w-1/3 ml-10">
                                <label className="text-[#272727]">Telefoonnummer</label>
                                <input defaultValue={`${pb.authStore.model.telefoonnummer}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            </div>
                            </div>
                            <div className="flex mt-6">
                            <div className="flex flex-col w-1/3">
                                <label className="text-[#272727]">Adres</label>
                                <input defaultValue={`${pb.authStore.model.adres}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            </div>
                            <div className="flex flex-col w-1/3 ml-10">
                                <label className="text-[#272727]">Bedrijf</label>
                                <input defaultValue={`${pb.authStore.model.bedrijf}`} type="text" name="voornaam" className="text-[#a6a6a6] bg-white ring-2 ring-gray-300 w-full py-2 pl-2 rounded-md mt-2"></input>
                            </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
            </> : null}
            {index === 1 ? <>
            <div className="text-4xl text-slate-900 font-extrabold border-b-2 border-gray-200 pb-16 pr-96">Aankopen</div>
            {/* Als de gebruiker geen templates heeft krijgt hij dit te zien */}
            {pb.authStore.model.templates?.length === 0 && <span className="mt-20 text-xl font-semibold">Je hebt nog geen thema's gekocht</span>}
            <div className=" font-semibold py-2 rounded-md cursor-pointer mb-48">
                    {/* Als de gebruiker wel templates heeft krijgt hij dit te zien */}
                    {pb.authStore.model.templates?.map((t) =>{
                        return (
                        <div className="mt-2">
                            {templates.map((template) => {
                                if (template.id === t) {
                                    return (
                                        <div className="flex w-2/3 mt-16">
                                            <img className=" w-60 rounded-xl"src={template.thumbnail}/>
                                            <div className="ml-10">
                                                <div className="w-1/2">{template.name}</div>
                                                <button className="hover:bg-indigo-700 hover:scale-105 duration-700 w-40 py-2 rounded-full mt-[70px] bg-indigo-600 font-semibold text-white">Downloaden</button>
                                            </div>
                                        </div>
                                        )
                                    }
                                })
                            }
                        </div>
                            )})}
            </div>
                        </> : null}
            </div>
        </div>
        </div>
        </>
        )
    // Als de gebruiker niet ingelogd is krijgt hij dit te zien
    return (
    <div>
        {isLoading && <svg className=" left-0 right-0 top-[350px] absolute inline mx-auto w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-[#541CE9]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>}
        <form className="ring-2 ring-gray-300 bg-gray-50 flex flex-col w-[500px] mx-auto mt-32 rounded-md" onSubmit={handleSubmit(login)}>
            <h1 className="text-3xl font-semibold mx-auto my-10 border-b-2 w-full text-center pb-10">Login</h1>
            <input className="w-10/12 pl-6  focus:border-blue-500 border-b-2 border-gray-400 outline-none border-t-none border-l-none border-r-none h-12 rounded-b-none rounded-md mx-auto" type="text" placeholder="Email" {...register("email")} />
            <input className="w-10/12 pl-6 focus:border-blue-500 border-b-2 border-gray-400 outline-none border-t-none border-l-none border-r-none h-12 mt-16 rounded-b-none rounded-md mx-auto" type="password" placeholder="Wachtwoord" {...register("password")} />
            {/* Login knop */}
            <button className="bg-[#541CE9] text-white rounded-md w-10/12 mx-auto mt-16 h-12 mb-8 font-semibold text-lg" type="submit" disabled={isLoading}>{isLoading ? "Loading" : "Login"}</button>
        </form>
    </div>
    )
}