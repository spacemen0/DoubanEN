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
        title: 'Taking Drugs to Make Music To Take Drugs to',
        artist: 'Spacemen3',
        genre: 'Pop',
        average: 4.5,
        ratings: 100,
      },
      review: {
        username: 'MusicLover123',
        userID: 1,
        reviewDate: '2022-03-01',
        star: 3.5,
        content: `Be aggressive. Be selfish. Be as Allie X sets out to be on Girl With No Face. Nobody to prove anything to. Creativity for the indulgence of pleasure and nothing more. More artists should be open to this correspondence with what the soul desires. Girl With No Face demands nothing from its listeners because it has no intention of entertaining their expectations. It puts Allie X in a position of power. With the same roaring and upbeat focus as Future Islands’ People Who Aren’t There Anymore, the similarity and taste from Girl With No Face bring about the marrying of wild electropop and effective lyricism which on first listen sounds disconnected. Go around again and feel the flow. What a rush it makes for, and Allie X has a fine creation on their hands.  

Opener Weird World begins the running trend of consistent synth wonders. Sudden and grating uses of industrialised filler and drum machine beauties create a raging core which Allie X builds on. Friends can be replaced by your thoughts and the ambitions of the mind. Those darker and momentous highs are found in Girl With No Face, the vocal range on display is remarkable and benefits from a slightly sinister, creaking notion underneath it all. Familiar faces are not the friends you think them to be, as Allie X warns. Alienate those around you and fight the resulting outrage. The sense of theatrics within Girl With No Face is all part of the Allie X severity – taken up to the next level by the drum machine and techno blitz of Off With Her Tits.  

Fiddly electronics and the constant whir and buzz of these moments is what must be loved about Girl With No Face. Exceptionally unique and inspired moments of mixing that champion the new wave and synthpop blur. Many are in the thick of it though few do it as well as Allie X. Sincere yet sinister tones on John and Jonathan settle in well, the piece feeling ever-so-slightly haunted by its own shadow. Galina is about as pop adjacent as it gets, but even then the tinge of 1980s stylishness and the influence of the period flows through. Allie X is comfortable with a modernisation of the classic pop junctures of an era long gone – but within this shakeup are some of her finest songs. Punchy, energetic and lunging at the past with all the intent of a furious artist carving out a career-best effort, Girl With No Face truly has it all. 

Flickers of horrifying tech love on Hardware Software create another in a series of uncomfortable yet enchanting listens for Allie X. Nothing shy of exceptional the whole way through. Slim gothic tones can be heard throughout, but it never feels like the focus Allie X sets out for. In between all those plinking lights of high-strung and hair-raising instrumentals is a desire to be left alone with your thoughts. Girl With No Face presents the point of not being able to know someone – the shapeshifter at large as Allie X redefines the path to being known for an elusive stance. Girl With No Face dances through the likes of Pet Shop Boys and New Order with their heavy drum machines but Allie X finds sharp and joyous ruminations in the dark she creates. You Slept on Me is the high. That we did. Never too late to make amends and give Girl With No Face a play.  
`,
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
        star: 3.5,
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
        star: 3.5,
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
        star: 3.5,
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
        star: 3.5,
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
        star: 3.5,
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
        star: 3.5,
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