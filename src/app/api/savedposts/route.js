import { NextResponse } from "next/server";
import User from "../models/user";
import Post from "../models/post";
import connectMongoDB from "../libs/mongodb";
export async function PUT(request) {
    // console.log("request", request);
  const {  userid, postid } = await request.json();
    console.log("request", userid, postid);
  await connectMongoDB();
  console.log(userid, postid);
  try{
    const user = await User.findOne({_id:userid});
    console.log("user....", user);
    console.log("user saved posts", user.saved_posts)
    // const post = await Post.findOne({_id:postid});

    if(!user.saved_posts.includes(postid.toString())){
        user.saved_posts.push(postid);
        await user.save();
    }else{
        user.saved_posts = user.saved_posts.filter((post)=>post.toString()!==postid.toString());
        await user.save();
    }
    return NextResponse.json(
        { message: "Post saved successfully" },
        { status: 200 }
      );
  }catch(err){
    console.log(err)
    return NextResponse.json(
        { message: "Post not saved" },
        { status: 201 }
        );

  }
  
}

export async function GET(request) {
  await connectMongoDB();
  try{
    const userid  = request.nextUrl.searchParams.get("userid");
    const user = await User.findById(userid).populate("saved_posts");
    return NextResponse.json(user.saved_posts, { status: 200 });
  }catch(err){
    console.log(err)

    return NextResponse.json({message:"Error finding posts..."}, { status: 201 });
  }
  
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await post.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Post deleted successfully" },
    { status: 200 }
  );
}
