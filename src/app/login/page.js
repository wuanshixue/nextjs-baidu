"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message || "未知错误");
        if (res.ok) {
            // 登录成功，跳转首页
            router.push("/");
        } else {
            alert(data.error || "登录失败");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    登录
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="username"
                        placeholder="请输入用户名"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl p-3 shadow-md hover:scale-105 transform transition"
                    >
                        登录
                    </button>
                </form>
                {message && (
                    <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
                )}
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
