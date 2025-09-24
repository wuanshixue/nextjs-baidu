import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const district_id = searchParams.get("district_id")

    const ak = process.env.BAIDU_WEATHER_AK;
    const apiUrl = `https://api.map.baidu.com/weather/v1/?district_id=${district_id}&data_type=all&ak=${ak}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "获取天气失败" }, { status: 500 });
    }
}
