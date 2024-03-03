import { Image } from "./Image"

export function ListItem({ image, music, releaseDate, wants }: ListItemProps) {
    return (
        <div className="flex w-full">
            <div className="w-36 mr-2 lg:mr-4">
                <Image src={image.src} alt={image.alt} href={image.href} />
            </div>
            <div className="flex-col flex justify-between w-full">
                <a href="/#">{music.title}</a>
                <a href="/#">{music.artist}</a>
                <p>{releaseDate}</p>
                <div className="flex justify-between items-center ">
                    <p>{music.genre}</p>
                    <p>{music.average}</p>
                    <p>{music.ratings}</p>
                    <p>{wants}</p>
                </div>
            </div>
        </div>
    )
}