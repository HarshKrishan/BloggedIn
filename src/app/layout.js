import "./globals.css";
import { Inter } from "next/font/google";
import Authprovider from "./component/Authprovider/Authprovider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BloggedIn",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Authprovider>
        <body>{children}</body>
      </Authprovider>
    </html>
  );
}
