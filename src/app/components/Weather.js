"use client";
import { useEffect, useState } from "react";

export default function Weather({ district_id }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        if (!district_id) return; // 没有传位置就不请求
        async function fetchWeather() {
            const res = await fetch(`/api/weather?district_id=${district_id}`);
            const data = await res.json();
            setWeather(data);
        }
        fetchWeather();
    }, [district_id]); // ✅ 依赖是固定的

    if (!weather) return <p>请选择位置</p>;

    const now = weather?.result?.now;
    const location = weather?.result?.location;

    return (
        <div className="p-4 ">
            <p> {location?.city}{now?.temp}°{now?.text}</p>
        </div>
    );
}
