import React, {useState, useEffect, useRef} from "react";

import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";

const TradingChart = () =>{
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);


    useEffect(()=>{
        
        if (!chartContainerRef.current) return;

        
        // chart
        
        const chart = createChart(chartContainerRef.current, {
            layout:{
                background: {type: ColorType.Solid, color: "#161a1e"},
                textColor: '#d1d4dc',
            },
            grid:{
                vertLines: {color: "#2B2B43"},
                horzLines: {color: "#363C4E"},
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        });
        
        // add candles series 
        const candlestickSeries = chart.addSeries(CandlestickSeries,{
            upColor: '#26a68a', downColor: '#ef5350',
            borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });
        
        const mockData = [
             { time: 1736476800, open: 42000, high: 42500, low: 41800, close: 42300 }, // 2025-01-10
      { time: 1736563200, open: 42300, high: 42800, low: 42200, close: 42600 }, // 2025-01-11
      { time: 1736649600, open: 42600, high: 43000, low: 42100, close: 42200 }, // 2025-01-12
      { time: 1736736000, open: 42200, high: 42400, low: 41500, close: 41900 },     ];
    
      candlestickSeries.setData(mockData);
      chartRef.current = chart;

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
        chart.remove();
    };
},[]);


    return(
        <div ref={chartContainerRef} className="w-full h-full" />

    );
}

export default TradingChart;