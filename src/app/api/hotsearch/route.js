import {NextResponse} from "next/server";

export async function GET() {
    const API_KEY = process.env.TIANAPI_KEY;
    const API_URL = `https://apis.tianapi.com/nethot/index?key=${API_KEY}`;

    try{
        console.log("请求 URL:", API_URL); // 调试打印

        const res  =await fetch(API_URL);
        if(!res.ok){
            return NextResponse.json({error:"TianAPI 请求失败"},{status:res.status});
        }

        const data = await res.json();



        if(data.code !==200){
            return NextResponse.json({error: data.msg || "接口错误"},{status:500});
        }

        // data.result.list 是热搜数据数组
        const list = data.result?.list || [];


        return NextResponse.json({ list });
    }catch(err){
        return NextResponse.json({error:"服务器错误"},{status:500});
    }
}
