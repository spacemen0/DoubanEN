export function Image({ src, alt, href }: ImageProps) {
  return (
    <a href={href}>
      <img src={src} alt={alt} className="h-full w-full " />
    </a>
  );
}
