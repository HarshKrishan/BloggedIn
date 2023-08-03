import { NextResponse } from "next/server";


// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware running...");
    
    const token = request.cookies.get("token")?.value;
    console.log(token);
    
    if(request.nextUrl.pathname=="/api/login" || request.nextUrl.pathname=="/api/signup"){
        return;
    }
    
    const protectedRoutes = ["/blogs", "/profile"];
    const publicRoutes = ["/", "/login"];
    if (publicRoutes.includes(request.nextUrl.pathname) && token) {
        return NextResponse.redirect(new URL("/blogs", request.url));
    }
    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    // return;
//   return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/login","/blogs","/profile"],
};
