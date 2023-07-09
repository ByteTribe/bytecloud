import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { v4 } from "uuid";
config({});
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? ""
);
const CDNURL =
  "https://pqbnoyezospypjajwdzi.supabase.co/storage/v1/object/public/thinktalk/";

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
