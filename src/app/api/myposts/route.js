import connectMongoDB from "../libs/mongodb";
import Post from "../models/post";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { username, title, content } = await request.json();
  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { username, title, content });
  return NextResponse.json(
    { message: "Post updated successfully" },
    { status: 200 }
  );
}

export async function GET(request, { params }) {
  const  userid  = request.nextUrl.searchParams.get("userid");
  await connectMongoDB();
  console.log("finding posts of user", userid)
  const posts = await Post.find({userid:userid});
  console.log("posts", posts)
  if(posts.length===0){
    return NextResponse.json({message:"No posts found"}, { status: 200 });
  }
  return NextResponse.json(posts, { status: 200 });
}
