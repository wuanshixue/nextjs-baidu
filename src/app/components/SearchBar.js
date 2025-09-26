"use client";
import { useState, useEffect } from "react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("正在加载热搜...");

    // ✅ 第一次加载时，从后端拿热搜
    useEffect(() => {
        async function fetchHotSearch() {
            try {
                const res = await fetch("/api/hotsearch");
                const data = await res.json();

                // 打印调试用
                console.log("🔥 热搜数据:", data);

                const list = data.list || [];

                if (list.length > 0) {
                    // ✅ 随机挑选一条 keyword
                    const randomItem = list[Math.floor(Math.random() * list.length)];
                    setPlaceholder(randomItem.keyword);
                } else {
                    setPlaceholder("百度热搜词加载失败");
                }
            } catch (err) {
                console.error("获取热搜失败:", err);
                setPlaceholder("加载失败，请手动输入");
            }
        }

        fetchHotSearch();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="-translate-y-50 flex items-center w-full max-w-2xl rounded-2xl p-[3px] bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm"
        >
            <div className="flex flex-1 items-center rounded-2xl bg-white">
                {/* 输入框 */}
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}  // 用动态 placeholder
                    className="flex-1 px-4 py-10 rounded-l-2xl text-base outline-none -translate-y-8"
                />

                {/* 附件按钮 */}
                <button
                    type="button"
                    className="px-1 text-gray-500 hover:bg-blue-500 translate-y-9"
                    title="快速理解总结文件，支持PDF、Word、Excel、PPT、txt、Java、Python等，最大50MB"
                >
                    🖇️
                </button>

                {/* 图片按钮 */}
                <button
                    type="button"
                    className="px-1 text-gray-500 hover:bg-blue-500 translate-y-9 "
                    title="一键解图图片内容，支持jpg、png、gif等,最大10MB"
                >
                    🖼️
                </button>

                {/* 搜索按钮 */}
                <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-l from-blue-500 to-purple-500 text-white rounded-full hover:bg-blue-600 transition font-medium translate-y-7"
                >
                    百度一下
                </button>
            </div>
        </form>
    );
}
