import { uploadFile } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { MIMEType } from "util";

export async function POST(request: Request) {
    const data = await request.formData();

    const file: File | null = data.get('file') as unknown as File;

    if(!file) return NextResponse.json({success : false});

    const uploadedFile = await uploadFile({file, contentType: file.type})
    
    return NextResponse.json({url: uploadedFile.url});
}