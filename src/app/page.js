import Image from "next/image";
import SearchBar from "./components/SearchBar"; //
import HotSearch from "./components/HotSearch";
import Navbar from "./components/Navbar";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-start pt-32 h-screen space-y-8">
            <Navbar />
            {/* 百度 Logo */}
            <Image src="/百度.svg" alt="Baidu" width={200} height={100}  className="-translate-y-30"/>

            {/* 搜索栏 */}
            <SearchBar />
            {/* 百度热搜 */}
            <HotSearch />
        </main>
    );
}
