import { Image } from "./Image"

export function ListItem({ image, music, releaseDate, wants }: ListItemProps) {
    return (
        <div className="flex w-full">
            <div className="w-full mr-2 lg:mr-4 h-full max-w-32 max-h-32 mt-2">
                <Image src={image.src} alt={image.alt} href={image.href} />
            </div>
            <div className="flex-col flex justify-between w-full border-b border-gray-200 pb-1 align-top">
                <a href="/#" className="text-sky-700 text-xl">{music.title}</a>
                <a href="/#" className="text-sky-800 text-xl font-bold">{music.artist}</a>
                <p className="text-xl">{releaseDate}</p>
                <p className="text-xl">{music.genre}</p>
                <div className="flex justify-between items-center text-xl 3xl:pl-28 3xl:pr-4 xl:pr-2 xl:pl-8">

                    <p className="text-sky-600 text-2xl">{music.average}</p>
                    <p>{music.ratings}</p>
                    <p>{wants}</p>
                </div>
            </div>
        </div>
    )
}