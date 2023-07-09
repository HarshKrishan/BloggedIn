import { NextResponse } from "next/server";
import User from "../models/user";
import connectMongoDB from "../libs/mongodb";
// import { hash } from "bcryptjs";

export async function POST(request) {
  //   console.log("request", request);
  
    const { username, email, password } = await request.json();
    await connectMongoDB();
    const id = await User.find({email:email});
    console.log(id);
    if (id.length>0)
      return NextResponse.json({ message: "Already registered" }, { status: 404 });
    const res = await User.create({ username, email, password });
    console.log(res);
    if(res){
      return NextResponse.json(
        { message: "user created successfully" },
        { status: 201 }
      );
    }else{
      return NextResponse.json(
        { message: "user not created" },
        { status: 404 }
      );
    }
    
  
  
}

export async function GET(request) {
  await connectMongoDB();
  const id = await User.find({email:request.nextUrl.searchParams.get("email")});

  if(!id) return NextResponse.json({message: "user not found"}, {status: 404})
  return NextResponse.json(id, { status: 200 });
}

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await post.findByIdAndDelete(id);
//   return NextResponse.json(
//     { message: "Post deleted successfully" },
//     { status: 200 }
//   );
// }
