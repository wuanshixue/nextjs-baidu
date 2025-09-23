import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function GET() {
    try{
        // 从 cookie 里取 token
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json({ loggedIn: false }, { status: 401 });
        }
        try{
            // 验证 token
            const decoded = jwt.verify(token, SECRET);

            return NextResponse.json({
                loggedIn: true,
                user:{
                    id: decoded.id,
                    username: decoded.username,
                }
            })
        }catch(err){
            console.error("JWT 验证失败:", err);
            return NextResponse.json({ loggedIn: false,error:"无效 token" }, { status: 401 });
        }
    }catch(err){
        console.error("服务器错误:", err);
        return NextResponse.json({ error: "服务器错误" }, { status: 500 });
    }
}
