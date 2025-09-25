import "./globals.css";
import Link from "next/link";

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
      <head>
          <link
              href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
              rel="stylesheet"
          />
      </head>
      <body className="bg-white text-black">
      {children}

      {/* 底部 */}
      <footer className="translate-y-20  absolute bottom-5 left-0 right-0 flex justify-center text-gray-500 text-sm">
          <Link href="https://www.baidu.com" className="hover:text-gray-400">© 2025 仿百度项目 - 仅学习使用</Link>
      </footer>
      </body>
      </html>
  );
}
