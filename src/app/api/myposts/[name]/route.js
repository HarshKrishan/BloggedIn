import user from "../models/user";
import connectMongoDB from "../libs/mongodb";

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const name = request.nextUrl.searchParams.get("name");
  await connectMongoDB();
  const user = await user.find({ username: name });
  const posts = user.saved_posts;
  if (posts.length === 0) {
    return NextResponse.json({ message: "No posts found" }, { status: 200 });
  }
  return NextResponse.json(posts, { status: 200 });
}