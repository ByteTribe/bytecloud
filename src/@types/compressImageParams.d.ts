export interface ICropImage {
  compressionMethod: "crop";
  cropRegion: {
    x: number;
    y: number;
  };
}
export interface ICoverImage {
  compressionMethod: "cover";
}
export interface INoneMethod {
    compressionMethod: "";
}
export type compressImageParams = {
  file: File;
  imageSize: {
    width: number;
    height: number;
  };
  compressionMethod: "crop" | "cover" | ""
} & (ICropImage | ICoverImage | INoneMethod);
