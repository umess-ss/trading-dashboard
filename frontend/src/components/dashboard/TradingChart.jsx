import React, {useState, useEffect, useRef} from "react";

import { createChart, ColorType, CandlestickSeries } from "lightweight-charts";
import api from "../../api";

const TradingChart = ({assetId = 1}) =>{
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


        api.get(`assets/${assetId}/candles/`)
            .then(response=>{
                const candles = response.data;

                if (candlestickSeries){
                    candlestickSeries.setData(candles);
                }
            }).catch(error=>{
                console.error("Error Fetching candle data",error);
            });
        
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
},[assetId]);   // 3. Re-run effect if assetId changes


    return(
        <div ref={chartContainerRef} className="w-full h-full" />

    );
}

export default TradingChart;