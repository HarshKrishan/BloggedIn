import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../libs/mongodb";
import User from "../../models/user";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text"},
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        // await connectMongoDB();
        // const result = await User.findOne({ email: credentials.email });
        // if (!result) {
        //   throw new Error("No user found");
        // }
        // if ((result != null) & (credentials.password === result.password)) {
        //   return result;
        // }
        await connectMongoDB();
        const { email, password } = credentials;
        const isreal = await User.findOne({ email });
        // console.log(isreal);
        // console.log(bcrypt.compareSync(password, isreal.password));
        if ((isreal != null) & bcrypt.compareSync(password, isreal.password)) {
          // const token = Jwt.sign(
          //   {
          //     id: isreal._id,
          //     username: isreal.username,
          //   },
          //   process.env.JWT_SECRET,
          //   { expiresIn: "1h" }
          // );
          // console.log("auth",token);

          // const response = NextResponse.json(
          //   { message: "user found" },
          //   { status: 200 }
          // );
          // response.cookies.set("token", token, {
          //   httpOnly: true,
          // });

          return NextResponse.json({ message: "user found" ,user:isreal}, { status: 200 });
        } else {
          console.log("invalid credentials");
          return NextResponse.json(
            { message: "invalid credentials" },
            { status: 404 }
          );
        }
      },
    }),
  ],
  callbacks: {
    // async signInGoogleProvider(user, account, profile) {
    //   console.log("user", user);
    //   console.log("account", account);
    //   console.log("profile", profile);
    //   return true;
    // },
    // async signInGithubProvider(user, account, profile) {
    //   console.log("user", user);
    //   console.log("account", account);
    //   console.log("profile", profile);
    //   return true;
    // }
    async jwt(token,user){
      if(user){
        token.id=user.id;
        token.name=user.name;
        token.email=user.email;
      }
      return token;
    },
    async session(session,token){
      session.user=token;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
