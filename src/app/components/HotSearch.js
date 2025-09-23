"use client";
import { useEffect, useState } from "react";

export default function HotSearch() {
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0); // 当前页索引

    useEffect(() => {
        async function fetchHot() {
            try {
                const res = await fetch("/api/hotsearch");
                const data = await res.json();
                setList(data.list || []);
            } catch (err) {
                console.error("获取热搜失败:", err);
            }
        }
        fetchHot();
    }, []);

    // 计算当前展示的 10 条
    const pageSize = 10;
    const start = page * pageSize;
    const currentList = list.slice(start, start + pageSize);

    const handleChange = () => {
        if (list.length === 0) return;
        // 计算总页数
        const totalPages = Math.ceil(list.length / pageSize);
        setPage((prev) => (prev + 1) % totalPages); // 循环翻页
    };

    return (
        <div className="mt-8 w-full max-w-2xl -translate-y-50">
            {/* 标题 + 换一换 */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">百度热搜</h2>
                <button
                    onClick={handleChange}
                    className="text-gray-500 hover:underline text-sm hover:text-blue-500"
                >
                    🔁换一换
                </button>
            </div>

            {/* 热搜列表 */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {currentList.map((item, index) => (
                    <div key={index} className="flex items-center">
                        {/* 序号（需要加上页偏移） */}
                        <span className="text-red-600 font-bold w-6">
              {start + index + 1}
            </span>
                        {/* 热搜词 */}
                        <a
                            href={`https://www.baidu.com/s?wd=${encodeURIComponent(
                                item.keyword
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 truncate"
                        >
                            {item.keyword}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
