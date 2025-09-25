"use client";
import Link from "next/link";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => {
                if (data.loggedIn) {
                    setUser(data.user);
                }
            });
    }, []);
    // 退出登录
    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.reload(); // 刷新页面
    };

    // 顶部导航栏的主要菜单项
    const navItems = [
        { name: "新闻", href: "https://news.baidu.com/" },
        { name: "hao123", href: "https://www.hao123.com/" },
        { name: "地图", href: "https://map.baidu.com/" },
        { name: "贴吧", href: "https://tieba.baidu.com/" },
        { name: "视频", href: "https://haokan.baidu.com" },
        { name: "图片", href: "https://image.baidu.com/" },
        { name: "网盘", href: "https://pan.baidu.com/" },
        { name: "文库", href: "https://wenku.baidu.com" },
        { name: "AI", href: "https://chat.baidu.com/" },
    ];

    // “更多”下拉菜单项
    const moreItems = [
        { name: "翻译", href: "https://fanyi.baidu.com/", icon: "/icons/fanyi.png" },
        { name: "学术", href: "https://xueshu.baidu.com/", icon: "/icons/xueshu.png" },
        { name: "百科", href: "https://baike.baidu.com/", icon: "/icons/baike.png" },
        { name: "知道", href: "https://zhidao.baidu.com/", icon: "/icons/zhidao.png" },
        { name: "健康", href: "https://jiankang.baidu.com/", icon: "/icons/jiankang.png" },
        { name: "营销", href: "https://e.baidu.com/", icon: "/icons/yingxiao.png" },
        { name: "直播", href: "https://live.baidu.com/", icon: "/icons/zhibo.png" },
        { name: "音乐", href: "https://music.taihe.com/", icon: "/icons/yinyue.png" },
        { name: "橙篇", href: "https://cp.baidu.com/", icon: "/icons/chengpian.png" },
        { name: "布尔", href: "/randombool", icon: "/icons/boolean.png" },
    ];

    return (
        <header className="w-full bg-white -translate-y-36">
            {/* 顶部导航容器 */}
            <nav className="relative max-w-5xl mx-auto flex items-center justify-between py-3 px-4 text-sm text-gray-700">
                {/* 左侧导航 */}
                <div className="flex space-x-6 justify-left">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            className="hover:text-blue-600 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* 更多 - 下拉菜单 */}
                    <div className="relative group">
                        <span className="inline-flex items-center hover:text-blue-600 cursor-pointer">
                            更多
                        </span>
                        <div
                            className="absolute left-0 mt-2 w-80 bg-white border rounded-lg shadow-lg opacity-0 invisible -translate-y-2
                                       group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                       transition-all duration-500 ease-out"
                        >
                            <ul className="grid grid-cols-3 gap-2 p-2 text-sm text-gray-700">
                                {moreItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            target="_blank"
                                            className="flex items-center px-2 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600
                                                       transition-transform duration-300 hover:scale-105 space-x-2"
                                        >
                                            {item.icon && (
                                                <Image
                                                    src={item.icon}
                                                    alt={item.name}
                                                    width={20}
                                                    height={20}
                                                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                                                />
                                            )}
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 右侧：天气 + 用户状态 */}
                <div className="flex items-center space-x-6">
                    {/* 嘉兴 */}
                    <Weather district_id="330400" />
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span
                                className="text-zinc-900"
                                style={{ fontFamily: "'Great Vibes', cursive", fontSize: "2rem" }}
                            >
                                {user.username}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-black-400 hover:underline hover:text-slate-500"
                            >
                                退出
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link href="/login" className="text-blue-600 hover:underline">
                                登录
                            </Link>
                            <Link href="/register" className="text-blue-600 hover:underline">
                                注册
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* 底部分割线 */}
            <div className="border-b absolute left-0 right-0 top-12 translate-y-1"></div>
        </header>
    );
}
