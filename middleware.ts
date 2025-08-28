import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export default withClerkMiddleware((req) => NextResponse.next());
export const config = { matcher: ["/((?!_next|.*\..*|api).*)"] };
