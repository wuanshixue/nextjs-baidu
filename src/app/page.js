import Image from "next/image";
import SearchBar from "./components/SearchBar"; //
import HotSearch from "./components/HotSearch";
import Link from "next/link";


export default function Page() {
    return (
        <main className="flex flex-col items-center justify-start pt-32 h-screen space-y-8">
            {/* 顶部导航 */}
            <div className="absolute top-4 right-8 space-x-4">
                <Link href="./login" className="text-blue-600 hover:underline">登录</Link>
                <Link href="./register" className="text-blue-600 hover:underline">注册</Link>
            </div>
            {/* 百度 Logo */}
            <Image src="/百度.svg" alt="Baidu" width={200} height={100} />

            {/* 搜索栏 */}
            <SearchBar />
            {/* 百度热搜 */}
            <HotSearch />
        </main>
    );
}
