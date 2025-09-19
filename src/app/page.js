"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function App() {
    // 定义一个状态变量 query，用于存储搜索框输入的内容
    const [query, setQuery] = useState("");

    // 获取路由对象，可以用来进行页面跳转
    const router = useRouter();

    // 表单提交的处理函数
    const handleSubmit = (e) => {
        e.preventDefault(); // 阻止默认的表单提交刷新页面行为
        // 使用 Next.js 路由跳转到 /search 页面，并带上查询参数 q
        router.push(`/search?q=${query}`);
    };

    return (
        <main className="flex flex-col items-center py-16 h-screen">
            <Image src="/百度.svg" alt="Baidu" width={200} height={10} />

            {/* 搜索框表单部分 */}
            <form onSubmit={handleSubmit} className="mt-[-60px] flex">
                {/* 输入框：绑定 query 状态，监听输入变化 */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // 更新 query 状态
                    placeholder="搜索"
                    className="border border-gray-300 rounded-l-full px-4 py-2 w-96 focus:outline-none"
                />
                {/* 按钮：点击后提交表单，触发 handleSubmit */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-r-full px-6 py-2"
                >
                    百度一下
                </button>
            </form>
        </main>
    );
}
