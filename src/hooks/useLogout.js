import pb from '../lib/pocketbase';
import { useState } from 'react';
export default function useLogout(){
    const [i,setI] = useState(0);
    // Logout functie die de cookies verwijderd en de state verhoogd waardoor er een rerender plaatsvindt.
    function logout(){
        pb.authStore.clear();
        setI(i+1);
    }
    return logout;
}