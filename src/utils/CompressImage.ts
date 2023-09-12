import Jimp from "jimp";
import { compressImageParams } from "@/@types/compressImageParams";

export const compressImage = async ({
  file,
  imageSize,
  ...rest
}: compressImageParams) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  //const fileType = file.type.split("/").pop() as keyof ext;

  switch (rest.compressionMethod) {
    case "cover": {
      return Jimp.read(buffer).then((image) => {
        return image
          .quality(60)
          .cover(imageSize.width, imageSize.height)
          .getBufferAsync(file.type);
      });
    }
    case "crop": {
      return Jimp.read(buffer).then((image) => {
        return image
          .quality(60)
          .crop(
            rest.cropRegion.x,
            rest.cropRegion.y,
            imageSize.width,
            imageSize.height
          )
          .getBufferAsync(file.type);
      });
    }

    default:
      return Jimp.read(buffer).then((image) => {
        return image
          .resize(imageSize.width, imageSize.height)
          .quality(60)
          .getBufferAsync(file.type);
      });
  }
};
