<div align="center">
  <img src="https://pqbnoyezospypjajwdzi.supabase.co/storage/v1/object/public/thinktalk//uploads/5c9b687a-0966-43a7-86ae-f0e2203571a7?raw=true" alt="Noodle logo" width="75">  
  <h1>ByteCloud</h1>
  <br>
</div>

This is a [Next.js](https://nextjs.org/) application to upload files using Supabase Storage.

[See it running on Vercel](https://bytecloud.vercel.app/)


## API ENDPOINT

### POST -> /upload
#### Query Params
  - w (width) *required*
  - h (height) *required*
  - m (method)
  - x (crop coordinate) 
  - y (crop coordinate)

#### example  => domain.com/upload?w=372&h=346&m=crop&x=470&y=100