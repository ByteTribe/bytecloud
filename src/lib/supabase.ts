import supabase from "@/config/supabase";
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

export const uploadFile = async ({
  ext,
  file,
  contentType,
}: IUpload): Promise<IResponse> => {
  const id = v4();
  const { error } = await supabase.storage
    .from("thinktalk")
    .upload(`/uploads/${id}`, file, {
      contentType,
    });

  if (error) console.log(error);

  return {
    url: `${CDNURL}/uploads/${id}`,
    fileName: id,
  };
};
