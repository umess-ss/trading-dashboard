import { useState, useEffect } from "react";


export const useMockPrice = (initialPrice) =>{
    const [price,setPrice] = useState(initialPrice);


    useEffect(()=>{
        const interval = setInterval(()=>{
            const change = (Math.random()-0.5) *2;
            setPrice(prev=>prev+change);
        },1000);
        return () => clearInterval(interval);
    }, []);

    return price.toFixed(2);
}