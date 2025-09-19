import Image from "next/image";
import SearchBar from "./components/SearchBar"; // ⬅️ 确保路径对

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-start pt-32 h-screen space-y-8">
            {/* 百度 Logo */}
            <Image src="/百度.svg" alt="Baidu" width={200} height={100} />

            {/* 搜索栏 */}
            <SearchBar />
        </main>
    );
}
