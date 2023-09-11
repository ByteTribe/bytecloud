import supabase from "@/config/supabase";
import sharp, { Metadata } from "sharp";
import { v4 } from "uuid";

const CDNURL = process.env.NEXT_PUBLIC_SUPABASE_CDNURL;
interface IUpload {
  file: File;
  ext: string;
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

const compressImage = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const image = sharp(buffer);

  const fileType = file.type.split("/").pop() as keyof ext;

  if (fileType === "jpeg" || fileType === "webp") {
    return sharp(buffer)
      .metadata()
      .then(({ width }) => {
        if (width) {
          return image[fileType]({
            quality: 60,
            force: true,
            progressive: true,
            mozjpeg: true,
          })
            .resize(920, 500, {
              kernel: sharp.kernel.nearest,
              fit: "cover",
              position: "center",
            })
            .toBuffer();
        }
      });
  } else if (fileType === "png") {
    return sharp(buffer)
      .metadata()
      .then(({ width }) => {
        if (width) {
          return image
            .png({
              quality: 60,
              force: true,
              progressive: true,
            })
            .resize(920, 500, {
              kernel: sharp.kernel.nearest,
              fit: "cover",
              position: "center",
            })
            .toBuffer();
        }
      });
  }
};

export const uploadFile = async ({
  file,
  contentType,
}: IUpload): Promise<IResponse> => {
  let compressedFile;
  const imageTypes = ["image/jpg", "image/jpeg", "image/webp", "image/png"];

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
