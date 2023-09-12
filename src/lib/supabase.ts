import supabase from "@/config/supabase";
import { v4 } from "uuid";
import Jimp from "jimp";

const CDNURL = process.env.NEXT_PUBLIC_SUPABASE_CDNURL;
interface IUpload {
  file: File;
  contentType: string;
}

interface IResponse {
  url: string;
  fileName: string;
}

interface ext {
  jpeg: string;
  png: string;
  webp: string;
}

/**
 * TODO:
 * 1 - add a route only to cover image
 * 2 - add support for webp
 */

const compressImage = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  //const fileType = file.type.split("/").pop() as keyof ext;

  return Jimp.read(buffer).then((image) => {
    return image.quality(60).cover(920, 500).getBufferAsync(file.type);
  });
};

export const uploadFile = async ({
  file,
  contentType,
}: IUpload): Promise<IResponse> => {
  let compressedFile;
  const imageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (imageTypes.includes(file.type)) {
    compressedFile = await compressImage(file);
  }

  const id = v4();
  if (compressedFile) {
    const { error } = await supabase.storage
      .from("thinktalk")
      .upload(`/uploads/${id}`, compressedFile, {
        contentType,
      });

    if (error) throw error;
    return {
      url: `${CDNURL}/uploads/${id}`,
      fileName: id,
    };
  }

  const { error } = await supabase.storage
    .from("thinktalk")
    .upload(`/uploads/${id}`, file, {
      contentType,
    });

  if (error) throw error;

  return {
    url: `${CDNURL}/uploads/${id}`,
    fileName: id,
  };
};
