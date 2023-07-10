import { uploadFile } from "@/lib/supabase";
import { Copy, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { FileIcon } from "react-file-icon";
import { UploadFileList } from "./UploadFileList";

interface UploadProps {
  position: number;
  state: "uploading" | "done";
  url?: string;
}

export const UploadComponent = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isFileOutside, setIsFileOutside] = useState(false);
  const inputFile = useRef<HTMLInputElement>(null);

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

  return (
    <>
      <div
        onClick={() => {
          inputFile && inputFile.current && inputFile?.current.click();
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`w-full rounded-xl cursor-pointer  h-auto py-10 border-2 gap-3 transition-colors ${
          isDragging ? "border-indigo-300 " : "border-zinc-300"
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
              isDragging ? "text-indigo-400 scale-110" : "text-zinc-400  "
            }`}
          />
        </div>
        <div
          className={`text-sm transition-all ${
            isDragging ? "text-indigo-400" : "text-zinc-400 "
          }`}
        >
          Drag files here to upload
        </div>
      </div>
      <UploadFileList files={files} />
    </>
  );
};
