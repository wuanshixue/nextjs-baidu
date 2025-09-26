"use client";
import { useEffect, useState } from "react";

export default function Weather({ district_id }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!district_id) return; // 没有传位置就不请求
        // 定义一个异步函数用于获取天气数据
        async function fetchWeather() {
            // 向本地 API 发送请求，携带地区 ID 参数
            const res = await fetch(`/api/weather?district_id=${district_id}`);
            const data = await res.json();
            setWeather(data);       // 保存到 weather 状态中
        }
        fetchWeather();      // 调用上面定义的异步函数
    }, [district_id]);

    const now = weather?.result?.now;        // 当前天气情况（温度、天气描述等）
    const location = weather?.result?.location;     // 位置信息（城市名等）

    return (
        <div className="p-4 text-sm">
            {/* 显示天气信息：城市 + 温度 + 天气描述 */}
            <p> {location?.city}{now?.temp}℃{now?.text}</p>
        </div>
    );
}
