import { NextResponse } from 'next/server';

// 定义一个 GET 方法的 API 路由处理函数
export async function GET() {
    // 向外部接口发起请求（这里是你内网的 API 服务）
    const req = await fetch('http://10.88.10.38:8051/api/random-bool', {
        headers: {
            // 模拟请求头
            "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
            Accept: "*/*",              // 接受任意响应格式
            Host: "10.88.10.38:8051",   // 指定请求的 Host（某些服务要求）
            Connection: "keep-alive",   // 长连接
        },
    });

    // 把响应解析为 JSON 对象
    const data = await req.json();

    // 用 Next.js 提供的 NextResponse.json 返回数据给前端
    return NextResponse.json(data);
}
