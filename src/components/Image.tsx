export function Image({ src, alt, href }: ImageProps) {
    return (
        <a href={href}>
            <img src={src} alt={alt} className="w-full h-auto" />
        </a>
    );
}