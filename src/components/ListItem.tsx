import { Image } from "./Image"

export function ListItem({ image, title, artist, releaseDate, genre, average, ratings, wants }: ListItemProps) {
    return (
        <div className="flex w-full">
            <div className="w-24 lg:w-32 mr-2 lg:mr-4">
                <Image src={image.src} alt={image.alt} href={image.href} />
            </div>
            <div className="flex-col flex justify-between w-full">
                <a href="/#">{title}</a>
                <a href="/#">{artist}</a>
                <p>{releaseDate}</p>
                <div className="flex justify-between items-center ">
                    <p>{genre}</p>
                    <p>{average}</p>
                    <p>{ratings}</p>
                    <p>{wants}</p>
                </div>
            </div>
        </div>
    )
}