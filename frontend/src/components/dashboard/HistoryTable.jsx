import { useEffect, useState } from "react";
import api from "../../api";

const HistoryTable = () =>{
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        api.get('orders/')
        .then(res=>setOrders(res.data))
        .catch(err=>console.error(err));
    },[]);


    return(
        <table>
            {orders.map(order=>(
                <tr key={order.id}>
                    <td>{order.asset_symbol}</td>
                    <td className={order.side === 'BUY' ? 'text-green' : 'text-red' }>{order.side}</td>
                    <td>{order.price}</td>
                    <td>{order.status}</td>
                </tr>
            ))}
        </table>
    );
}