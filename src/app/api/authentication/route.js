import bcrypt from "bcrypt";
import Jwt  from "jsonwebtoken";
import connectMongoDB from "../libs/mongodb";
import { NextResponse } from "next/server";
import User from "../models/user";

export async function POST(request) {
    await connectMongoDB();
    const { email, password } = await request.json();
    const isreal = await User.findOne({email});
    // console.log(isreal);
    // console.log(bcrypt.compareSync(password, isreal.password));
    if (isreal!=null ) {
        if(bcrypt.compareSync(password, isreal.password)){
            const token = Jwt.sign(
              {
                id: isreal._id,
                username: isreal.username,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            );
            // console.log(token);

            const response = NextResponse.json(
              { message: "user found" },
              { status: 200 }
            );
            response.cookies.set("token", token, {
              httpOnly: true,
            });

            return response;
        }else{
            return NextResponse.json({ message: "invalid credentials" }, { status: 404 });
        }
        
    } else {
        return NextResponse.json({ message: "invalid credentials" }, { status: 404 });
    }
    console.log(isreal);
    // if (isreal!=null & password === isreal.password) {
    //   return NextResponse.json({ message: "user found" }, { status: 200 });
    // } else {
    //   return NextResponse.json(
    //     { message: "invalid credentials" },
    //     { status: 404 }
    //   );
    // }

}