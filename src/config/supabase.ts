import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({
  path: ".env.local",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY ?? ""
);

export default supabase;
