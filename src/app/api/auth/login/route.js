import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

export async function POST(req){
    try{
        const{username, password} = await req.json();

        // 连接数据库
        const connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "work1"
        });

        // 检查用户是否存在
        const [rows] = await connection.execute("SELECT * FROM users WHERE username = ?", [username]);
        if(rows.length === 0){
            return NextResponse.json({error: "用户名不存在"}, {status: 400});
        }

        // 验证密码
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match){
            return NextResponse.json({error: "密码错误"}, {status: 401});
        }
        // 简单返回
        return NextResponse.json({success: true, message: "登录成功",user:{id:user.id,username:user.username}});
    }catch(err){
        console.error("登录失败:", err);
        return NextResponse.json({error: "登录失败"}, {status: 500});
    }
}
