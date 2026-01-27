import React ,{useState, useEffect} from "react";
import axios from "axios";


const TradingForm = ({assetId=1, assetSymbol="BTC"}) =>{
    const [orderType, setOrderType] = useState('limit');
    const [side, setSide ] = useState('buy');
    const [price , setPrice] = useState('32323');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState(null);



    // 1. Fetch user data
    useEffect(()=>{
        const fetchBalance = async () =>{
            try {
                const token = localStorage.getItem("access_token");
                const response = await axios.get("http://localhost:8000/api/profile/me/",{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUserProfile(response.data);
            } catch (error) {
                console.log("Error Fetching Error", error);
            }
        };
        fetchBalance();
    },[]);


    const isBuy = side === 'buy';

    // 2. Safely Access Balance
    const getAvailable = () => {
        if (!userProfile) return 0;
        if (isBuy) return parseFloat(userProfile.usdt_balance);
        const key = `${assetSymbol.toLowerCase()}_balance`;
        return parseFloat(userProfile[key] || 0);
    }

    const available = getAvailable();


    // 3. Percentage Handler
    const handlePercentageClick = (pct) =>{
        const factor = parseFloat(pct)/100;
        if (isBuy){
            // How much BTC can I buy with X% of my USDT?
            const usdtToUse = available * factor;
            const calculatedAmount = usdtToUse / parseFloat(price);
            setAmount(calculatedAmount.toFixed(6));
        }else{
            // sell x% of my BTC
            setAmount((available*factor).toFixed(6));
        }
    };



    const handleSubmit = async () =>{
        const amountNum = parseFloat(amount);
        const priceNum = parseFloat(price);
        const totalCost = amountNum * priceNum;

        if (!amountNum || amountNum <=0 ) return alert("Enter a valid amount");


        // frontend validation
        if (isBuy && totalCost > available){
            alert("Insufficient Balance!!!")
            return;
        }

        const currentAssetBalance = !isBuy ?
        parseFloat(userProfile[`${assetSymbol.toLowerCase()}_balance`] || 0) : 0;


        if(!isBuy && parseFloat(amount) > currentAssetBalance){
            alert(`Insufficient ${assetSymbol} Asset`);
            return;
        }
        setLoading(true);

        try{

            const token = localStorage.getItem("access_token");
            const response = await axios.post("http://localhost:8000/api/orders/",{
                asset: assetId,
                side: side.toUpperCase(),
                price: parseFloat(price),
                quantity: amountNum
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.data.status === 'FILLED'){
                alert(`${side.toUpperCase()}  ${amountNum.toFixed(6)} ${assetSymbol} FILLED!!!`);
            }


            // Refresh balance after successful trade
            const updatedProfile = await axios.get("http://localhost:8000/api/profile/me/",  {
                headers: {
                Authorization: `Bearer ${token}`,  
                },
            });
            setUserProfile(updatedProfile.data);
            
        }catch(error){
            console.error(error);
            alert(error.response?.data?.non_field_errors || "Trade Failed");
        }finally{
            setLoading(false);
        }
    };





return (
        <div className="flex flex-col gap-4 p-4 bg-[#161a1e] h-full border-t border-gray-800 lg:border-t-0 text-white">
            {/* Buy/Sell Toggles */}
            <div className="flex p-1 bg-gray-900 rounded-md">
                <button onClick={() => setSide('buy')} 
                    className={`flex-1 py-2 text-sm font-bold rounded ${isBuy ? 'bg-tradeGreen text-white' : 'text-gray-400'} transition-colors`}>
                    Buy
                </button>
                <button onClick={() => setSide('sell')} 
                    className={`flex-1 py-2 text-sm font-bold rounded ${!isBuy ? 'bg-tradeRed text-white' : 'text-gray-400'} transition-colors`}>
                    Sell
                </button>
            </div>

            {/* Price & Amount Inputs */}
            <div className="space-y-3">
                <div className="relative">
                    <label className="absolute left-3 top-2 text-[10px] text-gray-500 uppercase">Price</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded pt-5 pb-1 px-3 text-sm focus:border-yellow-500 outline-none font-mono" />
                    <span className="absolute right-3 top-4 text-xs text-gray-500">USDT</span>
                </div>

                <div className="relative">
                    <label className="absolute left-3 top-2 text-[10px] text-gray-500 uppercase">Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded pt-5 pb-1 px-3 text-sm focus:border-yellow-500 outline-none font-mono" />
                    <span className="absolute right-3 top-4 text-xs text-gray-500">{assetSymbol}</span>
                </div>

                {/* Percentage Buttons */}
                <div className="flex justify-between gap-1">
                    {['25%', '50%', '75%', '100%'].map((pct) => (
                        <button key={pct} onClick={() => handlePercentageClick(pct)}
                            className="flex-1 bg-gray-800 py-1 text-[10px] text-gray-400 rounded hover:bg-gray-700">
                            {pct}
                        </button>
                    ))}
                </div>

                <button onClick={handleSubmit} disabled={loading || !amount}
                    className={`w-full py-3 mt-2 rounded font-bold text-sm uppercase ${isBuy ? 'bg-tradeGreen' : 'bg-tradeRed'} disabled:opacity-50`}>
                    {loading ? 'Processing...' : `${side} ${assetSymbol}`}
                </button>

                <div className="flex justify-between text-[11px] text-gray-500 mt-2">
                    <span>Available</span>
                    <span className="text-gray-300 font-mono">
                        {available.toFixed(isBuy ? 2 : 6)} {isBuy ? 'USDT' : assetSymbol}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TradingForm;