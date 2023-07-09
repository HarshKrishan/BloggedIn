import bcrypt from "bcrypt";

import connectMongoDB from "../libs/mongodb";
import { NextResponse } from "next/server";
import User from "../models/user";

export async function POST(request) {
    await connectMongoDB();
    const { email, password } = await request.json();
    const isreal = await User.findOne({email});
    // if (isreal & (await bcrypt.compare(password, isreal.password))) {
    //     return NextResponse.json({message: "user found"}, {status: 200});
    // } else {
    //     return NextResponse.json({ message: "invalid credentials" }, { status: 404 });
    // }
    // console.log(isreal);
    if (isreal!=null & password === isreal.password) {
      return NextResponse.json({ message: "user found" }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 404 }
      );
    }

}