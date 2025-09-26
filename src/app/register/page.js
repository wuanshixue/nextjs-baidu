"use client";
import { useState } from "react";

export default function RegisterPage() {
    // 定义表单状态
    const [form, setForm] = useState({ username: "", password: "" });
    // 用来存储后台返回的提示信息（比如“注册成功”或“用户名已存在”）
    const [message, setMessage] = useState("");

    // 当输入框内容变化时触发，更新 form 状态
    const handleChange = (e) => {
        setForm({
            ...form,        // 保留原有的其他字段
            [e.target.name]: e.target.value });     // 动态更新对应 name 的值
    };

    // 表单提交事件
    const handleSubmit = async (e) => {
        e.preventDefault(); // 阻止表单默认提交行为

        // 发送 POST 请求到后端 API（/api/auth/register）
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form), // 把表单状态转换成 JSON 发送
        });

        // 等待后端返回 JSON 数据
        const data = await res.json();
        // 更新提示信息（成功/失败等）
        setMessage(data.message || "未知错误");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            {/* 注册卡片容器 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

                {/* 标题 */}
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    注册账号
                </h1>

                {/* 注册表单 */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* 用户名输入框 */}
                    <input
                        type="text"
                        name="username"
                        placeholder="请输入用户名"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />

                    {/* 密码输入框 */}
                    <input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />

                    {/* 注册按钮 */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl p-3 shadow-md hover:scale-105 transform transition"
                    >
                        注册
                    </button>
                </form>

                {/* 如果 message 不为空，则显示提示文字 */}
                {message && (
                    <p className="mt-4 text-center text-red-500 text-sm">{message}</p>
                )}

                {/* 底部“去登录”链接 */}
                <p className="text-gray-500 text-sm text-center mt-6">
                    已有账号？
                    <a href="/login" className="text-blue-600 hover:underline">
                        去登录
                    </a>
                </p>
            </div>
        </div>
    );
}
