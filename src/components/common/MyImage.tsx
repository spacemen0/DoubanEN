import { ImageProps } from "../../utils/type.ts";

export function MyImage({ src, alt }: ImageProps) {
  return <img src={src} alt={alt} className="h-full w-full " />;
}
