import { uploadFile } from "@/lib/supabase";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Copy, PlusIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { FileIcon } from "react-file-icon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface IUpload {
  position: number;
  state: "uploading" | "done";
  url?: string;
}

interface UploadFileList {
  files: File[];
}
export const UploadFileList = ({ files }: UploadFileList) => {
  const [fileList, setFileList] = useState<File[]>(files);

  useEffect(() => {
    setFileList(files);
  }, [files]);
  const [uploadList, setUploadList] = useState<IUpload[] | null>(null);
  const notify = () =>
    toast.success("Url copied!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
        notify();
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

  const removeFile = (position: number) => {
    setUploadList((prev) => {
      if (!prev) return null;
      let newArr = [...prev];
      let idx = newArr.findIndex((item) => item.position === position);
      newArr.splice(idx, 1);
      return newArr;
    });

    setFileList((prev) => {
      if (!prev) return [];
      let newArr = [...prev];
      let idx = newArr.findIndex(
        (item) => item.name === fileList[position].name
      );
      newArr.splice(idx, 1);
      return newArr;
    });
  };

  return (
    <>
      <div className="space-y-3 max-h-[250px] overflow-y-auto">
        {fileList.map((file, index) => (
          <div
            key={index}
            className="w-full p-3 border border-zinc-300  rounded-xl flex items-center justify-between"
          >
            <div className="flex gap-3 items-center">
              <div className="text-sm w-5 h-6">
                <FileIcon extension="file" />
              </div>
              <div className="text-xs flex flex-col w-[100px] md:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                <div className="text-zinc-600  font-semibold">{file.name}</div>
                <div className="text-zinc-500  ">
                  {(file.size / (1024 * 1024)).toFixed(2)} Mb
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <button
                disabled={fileIsUploaded(index) || fileIsUploading(index)}
                onClick={() => handleUpload(file, index)}
                className={`text-xs  px-3 rounded-2xl py-1 active:bg-red-300 ${
                  fileIsUploaded(index)
                    ? "text-emerald-800 bg-emerald-100 "
                    : "text-indigo-800 bg-indigo-100  "
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
                        <Tooltip.Provider key={item.position}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <button
                                onClick={() => handleCopy(item.url ?? "")}
                                key={item.position}
                                className="text-xs bg-zinc-100 p-2 active:bg-zinc-300 transition-all hover:scale-110 rounded-2xl text-zinc-800"
                              >
                                <Copy className={`w-3 h-3`} />
                              </button>
                            </Tooltip.Trigger>
                            <Tooltip.Portal className="">
                              <Tooltip.Content
                                className="text-xs bg-white shadow-xl rounded-xl px-2 py-1 text-zinc-600 "
                                sideOffset={5}
                              >
                                Copy Url
                                <Tooltip.Arrow className="text-white shadow-lg fill-white" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      );
                    } else {
                      return null;
                    }
                  })}
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-xs bg-red-100 p-2 active:bg-red-300  transition-all hover:scale-110 rounded-2xl text-red-800"
                    >
                      <Trash className={`w-3 h-3`} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal className="">
                    <Tooltip.Content
                      className="text-xs bg-red-100   shadow-xl rounded-xl px-2 py-1 text-red-800 "
                      sideOffset={5}
                    >
                      Remove
                      <Tooltip.Arrow className=" shadow-lg fill-red-100" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </>
  );
};
