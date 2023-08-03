import { NextResponse } from "next/server";
import post from "../models/post";
import connectMongoDB from "../libs/mongodb";
export async function POST(request) {
//   console.log("request", request);
  const { username, title, content, userid } = await request.json();

  await connectMongoDB();
  console.log(username,title,content,userid)
  await post.create({ username, title, content, userid });

  return NextResponse.json(
    { message: "Post created successfully" },
    { status: 201 }
  );
}


export async function GET(request) {
    await connectMongoDB();
    const posts = await post.find({});
    return NextResponse.json(posts, { status: 200 });
}

export async function DELETE(request) {
    const id  = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}