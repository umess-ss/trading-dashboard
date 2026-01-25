    import React, {useState, useEffect, useRef} from "react";

    import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
    import api from "../../api";

    const TradingChart = () =>{

        const [symbol, setSymbol] = useState('BTCUSDT');
        const [loading, setLoading] = useState(true);
        const chartContainerRef = useRef(null);
        const chartRef = useRef(null);
        const seriesRef = useRef(null);


        const cryptos = [
            {name: 'Bitcoin', id: 'BTCUSDT'},
            {name: 'Ethereum', id: 'ETHUSDT'},
            {name: 'Solana', id: 'SOLUSDT'},
            {name: 'Binance Coin', id: 'BNBUSDT'},
            {name: 'Cardano', id: 'ADAUSDT'},
        ];


        useEffect(()=>{
            
            if (!chartContainerRef.current) return;

            
            // 1. Initialize chart
            
            const chart = createChart(chartContainerRef.current, {
                layout:{
                    background: {type: ColorType.Solid, color: "#161a1e"},
                    textColor: '#d1d4dc',
                },
                grid:{
                    vertLines: {color: "#2B2B43"},
                    horzLines: {color: "#363C4E"},
                },
                crosshair:{
                    mode: 0,      //normalize crosshair mode
                },
                rightPriceScale:{
                    autoScale: true,
                    borderVisible: false,
                },
                timeScale: {
                    borderVisible: false,
                    timeVisible: true, // Shows the time on the bottom axis
                    secondsVisible: false,
                    shiftVisibleRangeOnNewBar: true,
                },
                width: chartContainerRef.current.clientWidth,
                height: 400,
            });
            
            // add candles series 
            const candlestickSeries = chart.addSeries(CandlestickSeries,{
                upColor: '#26a68a', downColor: '#ef5350',
                borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });


            chartRef.current = chart;
            seriesRef.current = candlestickSeries;


                const fetchHistory = async () => {
                    try {
                        setLoading(true);
                        const response = await api.get(`assets/1/candles/?symbol=${symbol}`);
                        if (response.data && chartRef.current && seriesRef.current) {
                            const sortedData = response.data.sort((a, b) => a.time - b.time);
                            
                            // Set the data
                            seriesRef.current.setData(sortedData);
                            setLoading(false);
                            
                            // Fit content first, then zoom to the end
                            const timeScale = chartRef.current.timeScale();
                            
                            // This forces the chart to jump to the latest history immediately
                            timeScale.scrollToRealTime(); 
                            
                            // Optional: Zoom in slightly so candles aren't tiny
                            const lastIndex = sortedData.length;
                            timeScale.setVisibleLogicalRange({
                                from: lastIndex - 60, // Show last 60 candles
                                to: lastIndex,
                            });
                        }
                    } catch (error) {
                        console.error("History fetch failed:", error);
                    }
                };

                fetchHistory();

                // 3. Setup Websocket
                const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
                
                socket.onmessage = (event) =>{
                    const message = JSON.parse(event.data);
                    const candle = message.k;    //k contains the candles data

                    if(seriesRef.current){
                        seriesRef.current.update({
                            time: candle.t/1000,     // time in ms
                            open: parseFloat(candle.o),
                            high: parseFloat(candle.h),
                            low: parseFloat(candle.l),
                            close: parseFloat(candle.c),
                        });
                    }
                };

                

        const handleResize = () =>{
            if (chartRef.current && chartContainerRef.current){
                chartRef.current.applyOptions({
                    width: chartContainerRef.current.clientWidth
                });
            }
        };
        window.addEventListener("resize", handleResize);
        return () =>{
            window.removeEventListener("resize", handleResize);

            if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)){
                socket.close();
            }


            if(chartRef.current){
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    },[symbol]);   // 3. Re-run effect if assetId changes


return (
<div className="w-full max-w-5xl mx-auto p-4">
            {/* Category Switcher Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
                {cryptos.map((coin) => (
                    <button
                        key={coin.id}
                        onClick={() => setSymbol(coin.id)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                            symbol === coin.id 
                            ? "bg-emerald-500 text-white" 
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                    >
                        {coin.name}
                    </button>
                ))}
            </div>

            {/* Chart Container */}
            <div className="relative w-full h-[400px] bg-[#161a1e] rounded-lg border border-gray-800 overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#161a1e]/80 text-white">
                        <div className="flex flex-col items-center gap-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                            <span>Loading {symbol}...</span>
                        </div>
                    </div>
                )}
                <div ref={chartContainerRef} className="w-full h-full" />
            </div>
        </div>);
    }

    export default TradingChart;