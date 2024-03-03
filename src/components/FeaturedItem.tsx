import { Image } from "./Image";

export function FeaturedItem({ image, music, review }: { image: ImageProps; music: MusicProps, review: ReviewProps }) {
    return (
        <div className="">
            <Image {...image}></Image>
            <h2>{music.title}</h2>
            <p>Artist: {music.artist}</p>
            <p>Genre: {music.genre}</p>
            <p>Average Rating: {music.average}</p>
            <p>Total Ratings: {music.ratings}</p>
            <p>Reviewed by: {review.username}</p>
            <p>Review Date: {review.reviewDate}</p>
            <p>Review Content: {review.content}</p>
        </div>
    )
}