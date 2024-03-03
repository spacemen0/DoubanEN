import { FeaturedItem } from "./components/FeaturedItem";
import { Banner } from "./layouts/Banner";
import { Featured } from "./layouts/Featured";
import { PageHeader } from "./layouts/PageHeader";

export default function App() {
  const featuredItems: { image: ImageProps; music: MusicProps; review: ReviewProps }[] = [
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },
    {
      image: {
        src: "https://e.snmc.io/i/600/w/9a7629c2cbbd7ff6559b5fca565d9637/5831325/unwound-new-plastic-ideas-Cover-Art.jpg",
        alt: "image",
        href: "/#",
      },
      music: {
        title: 'Awesome Song',
        artist: 'Cool Artist',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        content: `This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!
        This song is amazing!This song is amazing!This song is amazing!This song is amazing!`,
      },
    },

  ];
  return (
    <div className="max-h-screen overflow-hidden flex flex-col">
      <PageHeader />
      <div className="overflow-y-scroll">
        <Banner />
        <div className="text-sky-700 font-bold text-xl mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 md:text-3xl">Featured Reviews</div>
        <Featured>
          {featuredItems.map((item, index) => (
            <FeaturedItem key={index} image={item.image} music={item.music} review={item.review} />
          ))}
        </Featured>
      </div>
    </div>
  );

}