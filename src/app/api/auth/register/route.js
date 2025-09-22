import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

export async function POST(req){
    try{
        const {username, password} = await req.json();

        if(!username || !password){
            return NextResponse.json({error: "用户名和密码不能为空"}, {status: 400});
        }

        // 连接数据库
        const db = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "work1"
        });

        // 加密密码
        const hash = await bcrypt.hash(password, 10);

        // 插入新用户
        await db.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",
            [username, hash]
        );
        await db.end();

        return NextResponse.json({success:true,message:"注册成功"})
    }catch(err){
        console.error("注册失败:", err);
        return NextResponse.json({error: "注册失败"}, {status: 500});
    }
}
