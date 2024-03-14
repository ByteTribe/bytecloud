import { uploadApiFile, uploadFile } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    let uploadedFile;
    const data = await request.formData();
    const url = new URL(request.url);

    const file: File | null = data.get("file") as unknown as File;

    uploadedFile = await uploadFile({ file });

    if (!uploadedFile) throw new Error("Failed to upload file");

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
