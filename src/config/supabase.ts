import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config({
  path: ".env.local",
});
console.log(process.env.SUPABASE_URL);
const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_API_KEY ?? ""
);

export default supabase;
