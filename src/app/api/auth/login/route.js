import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// JWT 密钥，从环境变量读取，如果没有就用默认值 "dev_secret"
const SECRET = process.env.JWT_SECRET || "dev_secret"; // 没有 .env 时也能跑

// 建立数据库连接
async function connectDB() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "work1",
    });
}
// POST 请求处理函数（登录接口）
export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "用户名和密码不能为空" }, { status: 400 });
        }

        const db = await connectDB();       // 连接数据库

        // 查找用户是否存在
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length === 0) {
            return NextResponse.json({ error: "用户不存在" }, { status: 400 });
        }

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return NextResponse.json({ error: "密码错误" }, { status: 400 });
        }

        // 生成 JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "7d" });
        // 设置 cookie
        cookies().set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 7 * 24 * 60 * 60, // 7天
        });
        return NextResponse.json({ message: "登录成功", username: user.username });
    } catch (err) {
        console.error("登录失败:", err);
        return NextResponse.json({ error: "服务器错误" }, { status: 500 });
    }
}
