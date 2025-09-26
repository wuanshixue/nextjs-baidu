import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    // 获取 URL 中的 district_id（地区 ID，用于查询天气）
    const district_id = searchParams.get("district_id")

    const ak = process.env.BAIDU_WEATHER_AK;
    // 拼接百度天气 API 的完整请求地址
    const apiUrl = `https://api.map.baidu.com/weather/v1/?district_id=${district_id}&data_type=all&ak=${ak}`;

    try {
        // 向百度天气 API 发送请求
        const res = await fetch(apiUrl);
        const data = await res.json();
        // 返回 API 返回的天气数据
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "获取天气失败" }, { status: 500 });
    }
}
