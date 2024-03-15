import { ImageProps } from "../../type";

export function MyImage({ src, alt }: ImageProps) {
  return <img src={src} alt={alt} className="h-full w-full " />;
}
