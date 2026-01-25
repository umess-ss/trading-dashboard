    import React, {useState, useEffect, useRef} from "react";

    import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
    import api from "../../api";

    const TradingChart = ({assetId = 1}) =>{
        const [loading, setLoading] = useState(true);
        const chartContainerRef = useRef(null);
        const chartRef = useRef(null);
        const seriesRef = useRef(null);


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
                        const response = await api.get(`assets/${assetId}/candles/`);
                        if (response.data && chartRef.current && seriesRef.current) {
                            const sortedData = response.data.sort((a, b) => a.time - b.time);
                            
                            // Set the data
                            seriesRef.current.setData(sortedData);
                            setLoading(false);
                            
                            // Fit content first, then zoom to the end
                            const timeScale = chartRef.current.timeScale();
                            
                            // This forces the chart to jump to the latest history immediately
                            timeScale.fitContent(); 
                            
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
                const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');
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
            socket.close();
            if(chartRef.current){
                chartRef.current.remove();
                chartRef.current = null;
            }
        };
    },[assetId]);   // 3. Re-run effect if assetId changes


return (
    <div className="relative w-full h-[400px]">
        {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#161a1e] text-white">
                Loading History...
            </div>
        )}
        <div ref={chartContainerRef} className="w-full h-full" />
    </div>
);
    }

    export default TradingChart;