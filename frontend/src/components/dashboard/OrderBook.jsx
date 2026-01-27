import React from "react";

const OrderBook = () =>{
    const asks = [
    { price: 42350.5, amount: 0.12, total: 0.12 },
    { price: 42348.0, amount: 0.45, total: 0.57 },
    { price: 42345.2, amount: 1.20, total: 1.77 },
    ];

    const bids = [
    { price: 42340.0, amount: 0.80, total: 0.80 },
    { price: 42338.5, amount: 0.25, total: 1.05 },
    { price: 42335.1, amount: 0.90, total: 1.95 },
    ];

    return(
        <div className="flex flex-col h-full text-[12px] font-mono">
            <div className="grid grid-cols-3 p-2 text-gray-500 border-b border-gray-800">
                <span>Price</span>
                <span className="text-right">Amount</span>
                <span className="text-right">Total</span>
            </div>

        <div className="flex-1 overflow-hidden flex flex-col-reverse">
            {asks.map((order,i)=>(
                <div key={i} className="relative grid grid-cols-3 py-0.5 hover:bg-gray-800 group">
                    <div className="absolute right-0 top-0 h-full bg-red-900/20" />
                    <span className="text-tradeRed z-10">{order.price.toLocaleString()}</span>
                    <span className="text-right z-10">{order.amount.toFixed(4)}</span>
                    <span className="text-right z-10 text-gray-400">{order.total.toFixed(2)}</span>
                </div>
            ))}
        </div>




            <div className="py-2 px-2 bg-gray-900/50 flex flex-col">
            <span className="text-lg text-tradeGreen font-bold">$27,323</span>
            <span className="text-lg text-tradeGreen font-bold">Index: $27,299</span>
            </div>


            {/* Bid Buys */}
            <div className="flex-1 overflow-hidden">
                {bids.map((order,i)=>(
                    <div key={i} className="relative grid grid-cols-3 px-2 py-0.5 hover:bg-gray-800">
                        <div className="absolute right-0 top-0 h-full bg-tradeGreen/10" 
                        style={{width: `${(order.total /2) *100}%`}}/>
                        <span className="text-tradeGreen z-10">{order.price.toLocaleString()}</span>
                        <span className="text-right z-10">{order.amount.toFixed(4)}</span>
                        <span className="text-right z-10 text-gray-400">{order.total.toFixed(2)}</span>
                    </div>
                ))}
            </div>


        </div>
        
    );
}

export default OrderBook;