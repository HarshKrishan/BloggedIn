
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from "../models/user";

export async function GET(request){
    const token = request.cookies.get("token")?.value;
    // console.log("cookies",request.cookies);
    // console.log(token);
    
    if(token===undefined){
        return NextResponse.json({message: "unauthorized"}, {status: 401});
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(data.id).select("-password");
    console.log("user",user);
   
    return NextResponse.json(user);
}