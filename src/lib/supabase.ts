import supabase from "@/config/supabase";
import { v4 } from "uuid";
import { compressImage } from "@/utils/CompressImage";
import { compressImageParams } from "@/@types/compressImageParams";

const CDNURL = process.env.NEXT_PUBLIC_SUPABASE_CDNURL;

interface IResponse {
  url: string;
  fileName: string;
}

interface ext {
  jpeg: string;
  png: string;
  webp: string;
}

export const uploadFile = async ({
  file
}: compressImageParams): Promise<IResponse> => {
  const id = v4();
  const { error } = await supabase.storage
    .from("thinktalk")
    .upload(`/uploads/${id}`, file, {
      contentType: file.type,
    });

  if (error) throw error;

  return {
    url: `${CDNURL}/uploads/${id}`,
    fileName: id,
  };
};

export const uploadApiFile = async ({
  file,
  imageSize,
  ...rest
}: compressImageParams): Promise<IResponse | undefined> => {
  let compressedFile;
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (imageTypes.includes(file.type)) {
    compressedFile = await compressImage({
      file,
      imageSize,
      compressionMethod: "",
    });
    if (rest.compressionMethod === "crop")
      compressedFile = await compressImage({
        file,
        imageSize,
        compressionMethod: rest.compressionMethod,
        cropRegion: rest.cropRegion,
      });
    if (rest.compressionMethod === "cover")
      compressedFile = await compressImage({
        file,
        imageSize,
        compressionMethod: rest.compressionMethod,
      });
  }

  const id = v4();
  if (compressedFile) {
    const { error } = await supabase.storage
      .from("thinktalk")
      .upload(`/uploads/${id}`, compressedFile, {
        contentType: file.type,
      });

    if (error) throw error;
    return {
      url: `${CDNURL}/uploads/${id}`,
      fileName: id,
    };
  }

}