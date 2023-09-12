import { uploadFile } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  console.log(data);

  const file: File | null = data.get("file") as unknown as File;

  if (!file) return NextResponse.json({ success: false });

  const uploadedFile = await uploadFile({ file, contentType: file.type });

  return NextResponse.json(
    { url: uploadedFile.url },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
