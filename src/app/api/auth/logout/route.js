import { NextResponse } from "next/server";

export async function POST(){
    const response = NextResponse.json({success:true});

    // 清除 cookie
    response.cookies.set("token","",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        expires:new Date(0),
        path:"/",
    });
    return response;
}
