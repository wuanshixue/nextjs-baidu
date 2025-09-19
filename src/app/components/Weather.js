"use client";
import { useEffect, useState } from "react";

// 天气关键词与 emoji 图标映射
const weatherIcons = {
    "晴": "☀️",
    "多云": "⛅",
    "阴": "☁️",
    "小雨": "🌦️",
    "中雨": "🌧️",
    "大雨": "⛈️",
    "雷阵雨": "🌩️",
    "小雪": "🌨️",
    "中雪": "❄️",
    "大雪": "☃️",
    "雾": "🌫️",
    "霾": "🌫️",
};

export default function Weather({ city = "Beijing" }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const res = await fetch(`/api/weather?city=${city}`);
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                console.error("获取天气失败:", err);
            }
        }
        fetchWeather();
    }, [city]);

    if (!weather) return <span>加载天气中...</span>;
    if (weather.error) return <span>天气获取失败</span>;

    // 根据天气描述选择 emoji
    const icon =
        weatherIcons[
            Object.keys(weatherIcons).find((key) =>
                weather.weather.includes(key)
            )
            ]

    return (
        <div className="flex items-center space-x-2">
      <span>
        {icon} {weather.city} | {weather.weather} {Math.round(weather.temp)}°C
      </span>
        </div>
    );
}
