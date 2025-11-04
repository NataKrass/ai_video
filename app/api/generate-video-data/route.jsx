import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.json();

  const result = await inngest.send({
    name: 'generate-video-data',
    data: {
      ...formData
    },
    url: "http://localhost:3000" // порт CLI
  })
  return NextResponse.json({ result: result });
}