import { NextResponse } from "next/server";
import user from "../models/user";
import connectMongoDB from "../libs/mongodb";
// import { hash } from "bcryptjs";

export async function POST(request) {
  //   console.log("request", request);
  const { username, email, password } = await request.json();
  await connectMongoDB();
  await user.create({ username, email, password });

  return NextResponse.json(
    { message: "user created successfully" },
    { status: 201 }
  );
}

// export async function GET(request) {
//   await connectMongoDB();
//   const posts = await post.find({});
//   return NextResponse.json(posts, { status: 200 });
// }

// export async function DELETE(request) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await post.findByIdAndDelete(id);
//   return NextResponse.json(
//     { message: "Post deleted successfully" },
//     { status: 200 }
//   );
// }
