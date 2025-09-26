import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function GET() {
    try {
        // 1. 先 await cookies()
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { loggedIn: false, error: "未登录，没有 token" },
                { status: 401 }
            );
        }

        try {
            // 2. 验证 token
            const decoded = jwt.verify(token, SECRET);

            return NextResponse.json({
                loggedIn: true,
                user: {
                    id: decoded.id,
                    username: decoded.username,
                },
            });
        } catch (err) {
            console.error(" JWT 验证失败:", err);
            return NextResponse.json(
                { loggedIn: false, error: "无效或过期的 token" },
                { status: 401 }
            );
        }
    } catch (err) {
        console.error(" 服务器错误:", err);
        return NextResponse.json(
            { error: "服务器错误，请稍后再试" },
            { status: 500 }
        );
    }
}
