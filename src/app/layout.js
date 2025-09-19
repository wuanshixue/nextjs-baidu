import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "百度一下，你就知道",
  description: "仿百度",
    icons: {
        icon: "/小百度.svg",

    },
};

export default function RootLayout({ children }) {
  return (
      <html lang="zh-CN">
      <body className="bg-white text-black">
      <Navbar />
      {children}

      {/* 底部 */}
      <footer className="absolute bottom-5 left-0 right-0 flex justify-center text-gray-500 text-sm">
          © 2025 仿百度项目 - 仅学习使用
      </footer>
      </body>
      </html>
  );
}
