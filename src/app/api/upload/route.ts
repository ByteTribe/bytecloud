import { uploadApiFile } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let uploadedFile;
  const data = await request.formData();
  const url = new URL(request.url);
  const width = url.searchParams.get('w');
  const height = url.searchParams.get('h');
  const x = url.searchParams.get('x');
  const y = url.searchParams.get('y');
  const compressionMethod = url.searchParams.get('m');
  const file: File | null = data.get("file") as unknown as File;
  
  if(!width || !height) throw new Error("Width or height not provided");
  if (!file) return NextResponse.json({ success: false });
  
  const imageSize = {
    width: parseInt(width),
    height: parseInt(height)
  }

  if(!compressionMethod)
    uploadedFile = await uploadApiFile({file, imageSize, compressionMethod:""});
  if(compressionMethod === 'crop') {
   
    if(!x || !y) throw new Error("Crop region not provided");
    
    const cropRegion = {
      x: parseInt(x),
      y: parseInt(y)
    }
    uploadedFile = await uploadApiFile({file, imageSize, compressionMethod, cropRegion});
  } else if(compressionMethod === 'cover') {
    uploadedFile = await uploadApiFile({file, imageSize, compressionMethod});
  }
  
  if(!uploadedFile) throw new Error("Failed to upload file");
  
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
