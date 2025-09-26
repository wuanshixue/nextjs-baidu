"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    // 定义表单状态（用户名 & 密码）
    const [form, setForm] = useState({ username: "", password: "" });
    // 用来存放后台返回的提示信息（比如“登录成功”或“密码错误”）
    const [message, setMessage] = useState("");
    // 获取 router 对象，用于登录成功后跳转首页
    const router = useRouter();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value });     // 根据 input 的 name 动态更新值
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 发送 POST 请求给后端登录接口
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),  // 把用户名和密码序列化为 JSON
        });

        const data = await res.json();
        setMessage(data.message || "未知错误");
        if (res.ok) {
            // 登录成功，跳转首页
            router.push("/");
        } else {
            // 登录失败，弹出提示
            alert(data.error || "登录失败");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* 登录卡片容器 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                {/* 标题 */}
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    登录
                </h1>

                {/* 登录表单 */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 用户名输入框 */}
                    <input
                        type="text"
                        name="username"
                        placeholder="请输入用户名"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />

                    {/* 密码输入框 */}
                    <input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />

                    {/* 登录按钮 */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl p-3 shadow-md hover:scale-105 transform transition"
                    >
                        登录
                    </button>
                </form>

                {/* 如果 message 不为空，就显示提示文本 */}
                {message && (
                    <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
                )}

                {/* 底部“去注册”链接 */}
                <p className="text-gray-500 text-sm text-center mt-6">
                    还没有账号？
                    <a href="/register" className="text-indigo-600 hover:underline">
                        去注册
                    </a>
                </p>
            </div>
        </div>
    );
}
