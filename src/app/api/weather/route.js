// app/api/weather/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city") || "Beijing";

    try {
        const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
        const resp = await fetch(url, { cache: "no-store" });
        if (!resp.ok) {
            return NextResponse.json(
                { error: "wttr.in API 请求失败" },
                { status: resp.status }
            );
        }

        const data = await resp.json();
        return NextResponse.json({
            city: data.nearest_area[0].areaName[0].value,
            temp: Number(data.current_condition[0].temp_C), // ✅ 转成数字
            weather: data.current_condition[0].weatherDesc[0].value,
        });
    } catch (error) {
        console.error("API 错误:", error);
        return NextResponse.json({ error: "服务器错误" }, { status: 500 });
    }
}
