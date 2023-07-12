import connectMongoDB from "../libs/mongodb";
import post from "../models/post";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { username, title, content } = await request.json();
  await connectMongoDB();
  await post.findByIdAndUpdate(id, { username, title, content });
  return NextResponse.json(
    { message: "Post updated successfully" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const  name  = request.nextUrl.searchParams.get("name");
  await connectMongoDB();
  const posts = await post.find({username:name});
  if(posts.length===0){
    return NextResponse.json({message:"No posts found"}, { status: 200 });
  }
  return NextResponse.json(posts, { status: 200 });
}
