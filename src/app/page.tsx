"use client";
import { UploadComponent } from "@/components/Upload/UploadComponent";
import { uploadFile } from "@/lib/supabase";
import { Check, Code, Copy, FolderOpen, Heart, Upload } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

export default function Home() {
  return (
    <main className="px-5 md:px-0 flex min-h-screen gap-5 flex-col items-center justify-start py-10 md:py-0 md:justify-center ">
      <div className="w-full md:w-2/4 h-auto p-4  border border-zinc-300  rounded-2xl space-y-5">
        <div className="w-full flex items-center justify-between">
          <div className="bg-indigo-100 p-3 rounded-full flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-indigo-800" />
          </div>
          <Link
            href="https://github.com/marvitphy/bytecloud"
            className="text-sm text-zinc-400 flex gap-2 "
          >
            Source Code <Code className="w-5 h-5" />
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700 ">Upload a file</p>
        </div>
        <UploadComponent />
      </div>

      <div className="w-full md:w-2/4 flex gap-2 text-xs text-zinc-400 items-center justify-center md:justify-end  ">
        <span>Created with</span>
        <Heart className={`w-4 h-5  transition-all text-red-500`} />
        <Link
          target="_blank"
          href="https://instagram.com/marcosvitor.bytetribe"
        >
          <span>by</span>{" "}
          <span className="text-zinc-500 font-semibold">
            @marcosvitor.bytetribe
          </span>
        </Link>
      </div>
    </main>
  );
}
