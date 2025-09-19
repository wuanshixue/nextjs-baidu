"use client";
import { useState } from "react";

// 定义一个随机布尔页面组件
export default function RandomBool() {
    // 定义一个状态变量 result，初始值为 null
    // setResult 用于更新 result 的值
    const [result, setResult] = useState(null);

    // 定义一个异步函数，用于调用后端 API
    async function fetchRandomBool() {
        // 请求我们在 Next.js 中写的 /api/random-bool 接口
        const res = await fetch("/api/random-bool");
        // 将接口响应解析为 JSON
        const data = await res.json();
        // 把结果存到状态里，并转成字符串方便显示
        setResult(JSON.stringify(data));
    }

    return (
        <main className="p-4">
            {/* 按钮：点击时会调用 fetchRandomBool */}
            <button
                onClick={fetchRandomBool}
                className="px-10 py-3 rounded-full font-bold text-white bg-gradient-to-r from-black-400 via-white-500 to-blue-600 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
                随机布尔
            </button>

            {/* 如果 result 有值，就显示结果 */}
            {result && <p className=" mt-4">结果: {result}</p>}
        </main>
    );
}
