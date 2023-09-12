"use client";
import { UploadComponent } from "@/components/Upload/UploadComponent";
import { uploadFile } from "@/lib/supabase";
import { Check, Code, Copy, FolderOpen, Heart, Upload } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { DarkModeToggler } from "@/components/DarkModeToggler";
import useSWRSubscription from "swr/subscription";
import { Metadata } from "next";

export const meta: Metadata = {
  title: "ByteCloud",
  description: "The cloud of ByteTribe",
  icons: {
   
  },
  openGraph: {
    images: [
      'https://pqbnoyezospypjajwdzi.supabase.co/storage/v1/object/public/thinktalk/uploads/9903bd4a-11b0-4753-87c0-2ca8bfb6a6ff'
    ]
  }
}
export default function Home() {


  return (
    <main className="px-5 md:px-0 flex min-h-screen gap-5 flex-col items-center justify-start py-10 md:py-0 md:justify-center dark:bg-slate-900 transition-all">
      <div className="absolute top-4 right-4">
        <DarkModeToggler />
      </div>
      <div className="w-full md:w-2/4 h-auto p-4  border border-zinc-300 dark:border-zinc-300/30  rounded-2xl space-y-5">
        <div className="w-full flex items-center justify-between">
          <div className="bg-indigo-100  dark:bg-indigo-600 p-3 rounded-full flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-indigo-800 dark:text-gray-200" />
          </div>
          <Link
            href="https://github.com/ByteTribe/bytecloud"
            className="text-sm text-zinc-400 dark:text-gray-200 flex gap-2 hover:text-zinc-600 transition-all"
          >
            <Code className="w-5 h-5" /> Source Code
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700 dark:text-gray-300">
            Upload a file
          </p>
        </div>
        <UploadComponent />
      </div>

      <div className="w-full md:w-2/4 flex gap-2 text-xs text-zinc-400 items-center justify-center md:justify-end  ">
        <span>Created with</span>
        <Heart className={`w-4 h-5  transition-all text-red-500`} />
        <Link
          target="_blank"
          href="https://instagram.com/byte.tribe"
        >
          <span>by</span>{" "}
          <span className="text-zinc-500 font-semibold dark:text-gray-300">
            @bytetribe
          </span>
        </Link>
      </div>
    </main>
  );
}
