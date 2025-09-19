"use client";
import Link from "next/link";
import Weather from "./Weather";

export default function Navbar() {
    // 顶部导航栏的主要菜单项
    const navItems = [
        { name: "新闻", href: "https://news.baidu.com/" },
        { name: "hao123", href: "https://www.hao123.com/" },
        { name: "地图", href: "https://map.baidu.com/" },
        { name: "贴吧", href: "https://map.baidu.com/" },
        { name: "视频", href: "https://haokan.baidu.com" },
        { name: "图片", href: "https://image.baidu.com/" },
        { name: "网盘", href: "https://pan.baidu.com/" },
        { name: "文库", href: "https://wenku.baidu.com" },
        { name: "AI", href: "https://chat.baidu.com/" },
    ];

    // “更多”下拉菜单项
    const moreItems = [
        { name: "翻译", href: "https://fanyi.baidu.com/" },
        { name: "学术", href: "https://xueshu.baidu.com/" },
        { name: "百科", href: "https://baike.baidu.com/" },
        { name: "random bool", href: "/randombool" },
    ];

    return (
        <header className="w-full bg-white">
            {/* 顶部导航容器 */}
            <nav className="max-w-5xl mx-auto items-left justify-end space-x-6 py-3 px-4 text-sm text-gray-700">
                {/* 遍历主菜单，渲染 Link 链接 */}
                {navItems.map((item) => (
                    <Link
                        key={item.name} // key 保证 React 渲染唯一性
                        href={item.href} // 链接地址
                        target="_blank" // 新开窗口打开
                        className="hover:text-blue-600 transition-colors"
                    >
                        {item.name}
                    </Link>


                ))}


                {/* 更多 - 下拉菜单 */}
                <div className="relative group">
                    {/* “更多”按钮 */}
                    <span
                        className="inline-flex items-center ml-118 relative -top-5 hover:text-blue-600 cursor-pointer"
                    >
            更多
          </span>

                    {/* 下拉菜单内容 */}
                    <div
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 invisible -translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out"
                    >
                        <ul className="py-2 text-sm text-gray-700">
                            {/* 遍历更多菜单项 */}
                            {moreItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        target="_blank"
                                        className="block px-4 py-2 hover:bg-gray-100 hover:text-blue-600"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Weather city="Jiaxing"/>
            </nav>

            {/* 底部分割线 */}
            <div className="border-b absolute left-0 right-0 top-10"></div>
        </header>
    );
}
