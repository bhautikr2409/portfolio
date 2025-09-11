import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function incr(req: NextRequest): Promise<NextResponse> {
  if (req.method !== "POST") {
    return new NextResponse("use POST", { status: 405 });
  }
  if (req.headers.get("Content-Type") !== "application/json") {
    return new NextResponse("must be json", { status: 400 });
  }

  const body = await req.json();
  if (!("slug" in body) || !body.slug) {
    return new NextResponse("Slug not found", { status: 400 });
  }

  // 👇 no Redis, just pretend success
  return new NextResponse(null, { status: 202 });
}
