"use client";
import { useSearchParams } from "next/navigation";



export default function SearchPage() {
    const searchParams = useSearchParams();//React Hook 获取 当前 URL 的查询参数
    const query = searchParams.get("q");//取出查询参数 q 对应的值

    return (
        <main className="p-6">
            <h1 className="text-xl font-bold">搜索结果：</h1>
            <p className="mt-4">你搜索的关键词是：<b>{query}</b></p>

            {/* 假搜索结果 */}
            <ul className="mt-6 space-y-3">
                <li><a href="#" className="text-blue-600 hover:underline">示例结果 1 - {query}</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">示例结果 2 - {query}</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">示例结果 3 - {query}</a></li>
            </ul>
        </main>
    )

}
