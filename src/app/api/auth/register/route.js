import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

// 建立数据库连接
async function connectDB() {
    return mysql.createConnection({
        host: "localhost",  // 你的数据库配置
        user: "root",
        password: "root",
        database: "work1",
    });
}

export async function POST(req) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "用户名和密码不能为空" }, { status: 400 });
        }

        const db = await connectDB();

        // 检查用户是否已存在
        const [rows] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (rows.length > 0) {
            return NextResponse.json({ error: "用户已存在" }, { status: 400 });
        }

        // 加密密码
        const hash = await bcrypt.hash(password, 10);

        // 插入新用户
        await db.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", [
            username,
            hash,
        ]);

        return NextResponse.json({ message: "注册成功" }, { status: 201 });
    } catch (err) {
        console.error("注册失败:", err);
        return NextResponse.json({ error: "服务器错误" }, { status: 500 });
    }
}
