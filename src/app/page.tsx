"use client";
import { uploadFile } from "@/lib/supabase";
import { Check, Code, Copy, FolderOpen, Heart, Upload } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

interface UploadProps {
  position: number;
  state: "uploading" | "done";
  url?: string;
}
export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isFileOutside, setIsFileOutside] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);
  const [uploadList, setUploadList] = useState<UploadProps[] | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsFileOutside(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setIsFileOutside(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    setIsFileOutside(false);

    // Processar o arquivo que foi solto aqui
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFiles((prev) => {
        return [...prev, ...files];
      });
    }
  };

  const handleUpload = async (file: File, position: number) => {
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop();

    setUploadList((prev) => {
      if (!prev) {
        return [
          {
            position,
            state: "uploading",
          },
        ];
      }

      const newarr = [...prev];
      newarr.push({
        position,
        state: "uploading",
      });

      return newarr;
    });

    if (!file) return null;

    try {
      const { url } = await uploadFile({
        contentType: file.type,
        ext: fileExtension ?? "",
        file,
      });

      setUploadList((prev) => {
        if (!prev) {
          return [
            {
              position,
              state: "done",
              url,
            },
          ];
        }
        let newArr = [...prev];
        let idx = newArr.findIndex(
          (item) => item.position === position && item.state === "uploading"
        );
        newArr[idx] = { position, state: "done", url };
        return newArr;
      });
    } catch (error) {
      alert("Error on upload file");
    }
  };

  const handleCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  function fileIsUploading(index: number) {
    return uploadList?.some(
      (item) => item.position === index && item.state === "uploading"
    );
  }
  function fileIsUploaded(index: number) {
    return uploadList?.some(
      (item) => item.position === index && item.state === "done"
    );
  }

  return (
    <main className="px-5 md:px-0 flex min-h-screen gap-5 flex-col items-center justify-start py-10 md:py-0 md:justify-center dark:bg-zinc-900">
      <div className="w-full md:w-2/4 h-auto p-4  border border-zinc-300 dark:border-zinc-500 rounded-2xl space-y-5">
        <div className="w-full flex items-center justify-between">
          <div className="bg-indigo-100 p-3 rounded-full flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-indigo-800" />
          </div>
          <div className="text-sm text-zinc-400 flex gap-2 dark:text-zinc-200">
            Source Code <Code className="w-5 h-5" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-400">
            Upload a file
          </p>
        </div>
        <div
          onClick={() => {
            inputFile && inputFile.current && inputFile?.current.click();
          }}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`w-full rounded-xl cursor-pointer  h-auto py-10 border-2 gap-3 transition-colors ${
            isDragging
              ? "border-indigo-300 "
              : "border-zinc-300 dark:border-zinc-500"
          } border-dashed flex flex-col items-center justify-center`}
        >
          <input
            multiple
            ref={inputFile}
            type="file"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;

              const filesArray = Array.from(files!);

              setFiles((prev) => {
                return [...prev, ...filesArray];
              });
            }}
          />
          <div>
            <Upload
              className={`w-10 h-10  transition-all ${
                isDragging
                  ? "text-indigo-400 scale-110"
                  : "text-zinc-400 dark:text-zinc-500 "
              }`}
            />
          </div>
          <div
            className={`text-sm transition-all ${
              isDragging
                ? "text-indigo-400"
                : "text-zinc-400 dark:text-zinc-400"
            }`}
          >
            Drag files here to upload
          </div>
        </div>
        <div className="space-y-3 max-h-[250px] overflow-y-auto">
          {files.map((file, index) => (
            <div
              key={index}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-500 rounded-xl flex items-center justify-between"
            >
              <div className="flex gap-3 items-center">
                <div className="text-sm w-5 h-6">
                  <FileIcon extension="file" />
                </div>
                <div className="text-xs flex flex-col w-[100px] md:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  <div className="text-zinc-600 dark:text-zinc-300 font-semibold">
                    {file.name}
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 ">
                    {(file.size / (1024 * 1024)).toFixed(2)} Mb
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  disabled={fileIsUploaded(index) || fileIsUploading(index)}
                  onClick={() => handleUpload(file, index)}
                  className={`text-xs  px-3 rounded-2xl py-1 ${
                    fileIsUploaded(index)
                      ? "text-emerald-800 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-800"
                      : "text-indigo-800 bg-indigo-100 dark:bg-indigo-500 dark:text-indigo-100 "
                  }`}
                >
                  {fileIsUploading(index) == true
                    ? "Wait..."
                    : fileIsUploaded(index) == true
                    ? "Done"
                    : "Upload"}
                </button>
                {uploadList &&
                  uploadList.length > 0 &&
                  uploadList
                    .filter((item) => item.position === index)
                    .map((item) => {
                      if (item.state === "done") {
                        return (
                          <button
                            onClick={() => handleCopy(item.url ?? "")}
                            key={item.position}
                            className="text-xs bg-zinc-100 p-2 transition-all hover:scale-110 rounded-full text-zinc-800"
                          >
                            <Copy className={`w-3 h-3`} />
                          </button>
                        );
                      } else {
                        return null;
                      }
                    })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-2/4 flex gap-2 text-xs text-zinc-400 items-center justify-center md:justify-end  ">
        <span>Created with</span>
        <Heart
          className={`w-4 h-5  transition-all ${
            isDragging ? "text-indigo-400 scale-110" : "text-red-500"
          }`}
        />
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
