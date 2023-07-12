import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "../../libs/mongodb";
import User from "../../models/user";

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
        await connectMongoDB();
        const result = await User.findOne({ email: credentials.email });
        if (!result) {
          throw new Error("No user found");
        }
        if ((result != null) & (credentials.password === result.password)) {
          return result;
        }
      },
    }),
  ],
  callbacks: {
    async signInGoogleProvider(user, account, profile) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      return true;
    },
    async signInGithubProvider(user, account, profile) {
      console.log("user", user);
      console.log("account", account);
      console.log("profile", profile);
      return true;
    }
  }
});

export { handler as GET, handler as POST };
