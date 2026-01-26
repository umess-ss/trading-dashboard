import React ,{useState, useEffect} from "react";

const TradingForm = () =>{
    const [orderType, setOrderType] = useState('limit');
    const [side, setSide ] = useState('buy');
    const [price , setPrice] = useState('32323');
    const [amount, setAmount] = useState('');



    const isBuy = side === 'buy';
    return(
        <div className="flex flex-col gap-4 p-4 bg-[#161a1e] h-full border-t border-gray-800 lg:border-t-0">
            {/* Buy sell toggle */}
            <div className="flex p-1 bg-gray-900 rounded-md">
                <button onClick={()=> setSide('buy')} 
                className={`flex-1 py-2 text-sm font-bold rounded ${isBuy ? 'bg-tradeGreen text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                    Buy
                </button>
                <button onClick={()=> setSide('sell')} 
                className={`flex-1 py-2 text-sm font-bold rounded ${!isBuy ? 'bg-tradeRed text-white' : 'text-gray-400 hover:text-white'} transition-colors`}>
                    Sell
                </button>
            </div>


            {/* Order Type (limit/market) */}
            <div className="flex gap-4 text-xs font-semibold text-gray-500 border-b border-gray-800 pb-2">
                <button onClick={()=> setOrderType('limit')}
                    className={orderType === 'limit' ? 'text-yellow-500' : '' }>
                    Limit
                </button>
                <button onClick={()=> setOrderType('market')}
                    className={orderType === 'market' ? 'text-yellow-500' : '' }>
                    Market
                </button>
            </div>



            {/* input fields  */}
            <div className="space-y-3">
                {orderType === 'limit' && (
                    <div className="relative">
                        <label className="absolute left-3 top-2 text-[10px] text-gray-500 uppercase">Price</label>
                        <input
                        type="number"
                        value={price}
                        onChange={(e)=> setPrice(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded pt-5 pb-1 px-3 text-sm focus:border-yellow-500 focus:outline-none font-mono"
                         />
                         <span className="absolute right-3 top-4 text-xs text-gray-500">USDT</span>
                    </div>
                )}



            <div className="relative">
            <label className="absolute left-3 top-2 text-[10px] text-gray-500 uppercase">Amount</label>
            <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded pt-5 pb-1 px-3 text-sm focus:border-yellow-500 focus:outline-none font-mono"
          />
          <span className="absolute right-3 top-4 text-xs text-gray-500">BTC</span>
        </div>



        {/* percentage quick select */}
        <div className="flex justify-between gap-1">
            {['25%', '50%', '75%', '100%'].map((pct)=>(
                <button 
                key={pct}
                className="flex-1 bg-gray-800 py-1 text-[10px] text-gray-400 rounded hover:bg-gray-700 transition-colors"
          >{pct}</button>
            ))}
        </div>


        {/* execution button */}
        <button
        className={`w-full py-3 mt-2 rounded font-bold text-sm uppercase transition-opacity hover:opacity-90 ${
          isBuy ? 'bg-tradeGreen' : 'bg-tradeRed'
        }`}
      >
        {isBuy ? 'Buy BTC' : 'Sell BTC'}
      </button>



      {/* info row */}


      <div className="flex justify-between text-[11px] text-gray-500 mt-2 font-sans">
        <span>Available</span>
        <span className="text-gray-300 font-mono">0.00 USDT</span>
      </div>
            </div>
        </div>
    );
}

export default TradingForm;