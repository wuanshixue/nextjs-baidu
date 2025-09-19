"use client";
import { useState } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // 直接跳转百度搜索
            window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-2xl rounded-2xl p-[3px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
        >
            {/* 内层白底容器，保证输入框区域是白色 */}
            <div className="flex flex-1 items-center rounded-2xl bg-white">
            {/* 输入框 */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="男子白天开豪车晚上变大盗"
                className="flex-1 px-4 py-10 rounded-l-2xl text-base outline-none -translate-y-9"
            />

            {/* 附件按钮 */}
            <button
                type="button"
                className="px-1 text-gray-500 hover:bg-blue-500 translate-y-9"
                title="上传文件"
            >
                🖇️
            </button>

            {/* 图片按钮 */}
            <button
                type="button"
                className="px-1 text-gray-500 hover:bg-blue-500 translate-y-9 "
                title="以图搜图"
            >
                🖼️
            </button>

            {/* 搜索按钮 */}
            <button
                type="submit"
                className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-medium translate-y-8"
            >
                百度一下
            </button>
                </div>

        </form>
    );
}
