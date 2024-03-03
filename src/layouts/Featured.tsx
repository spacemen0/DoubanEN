import { ReactNode } from "react";
import { Image } from "../components/Image";
import { ListItem } from "../components/ListItem";

export function Featured({ children }: { children: ReactNode[] }) {
  const items: ListItemProps[] = [{
    image: { src: "https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017", alt: "", href: "/#" },
    title: "title",
    artist: "artist",
    releaseDate: "release_date",
    genre: "genre",
    average: 3.5,
    ratings: 15,
    wants: 20
  }, {
    image: { src: "https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017", alt: "", href: "/#" },
    title: "title",
    artist: "artist",
    releaseDate: "release_date",
    genre: "genre",
    average: 3.5,
    ratings: 15,
    wants: 20
  }, {
    image: { src: "https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017", alt: "", href: "/#" },
    title: "title",
    artist: "artist",
    releaseDate: "release_date",
    genre: "genre",
    average: 3.5,
    ratings: 15,
    wants: 20
  }]
  return (

    <div className="flex ml-3 md:ml-6 lg:ml-12 mb-4">
      <div className="flex flex-col flex-1 md:flex-[0.65] mr-4 md:mr-8 lg:mr-16">
        <FeaturedBanner />
        {children.map((child, index) => (
          <div key={index} className="flex mt-4 w-full h-auto ">
            {child}
          </div>
        ))}
        <div className="md:hidden flex flex-col mr-4">
          <FeaturedDisplay />
          <FeaturedList>{items.map((item) => <ListItem {...item}></ListItem>)}</FeaturedList>
          <AdditionalInfo />
        </div>
      </div>
      <div className="flex flex-col flex-[0.35] !md:hidden">
        <FeaturedDisplay />
        <FeaturedList>{items.map((item) => <ListItem {...item}></ListItem>)}</FeaturedList>
        <AdditionalInfo />
      </div>
    </div>
  );
}


function FeaturedBanner() {
  return (
    <a href="#">
      <div className="flex md:hidden hover:bg-gray-100 transition-colors justify-start items-center mt-4 b-4">
        <div className=" w-32 ">
          <img src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Best of 2023" />
        </div>
        <div className="px-2 h-auto sm:text-xl w-auto font-bold text-sky-700 flex flex-col justify-center items-center">
          <h3>Douban EN Best of 2023</h3>
        </div>
      </div>
    </a>
  )
}



function FeaturedDisplay() {
  return (
    <div className="flex flex-col md:w-11/12 lg:w-10/12 mt-4">
      <div className="mb-4">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Big Image" href="/#" />
      </div>

      <div className="flex justify-between mb-4">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 1" href="/#" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 2" href="/#" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 3" href="/#" />
      </div>

      <div className="flex justify-between">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 4" href="/#" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 5" href="/#" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 6" href="/#" />
      </div>
    </div>
  );
}

function FeaturedList({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex mt-2 lg:mt-4 flex-col md:w-11/12 lg:w-10/12 pr-4 lg:pr-8">
      <div className="text-sky-700 font-bold text-xl md:text-3xl">Featured List</div>
      <div className="flex gap-2">
        <button>Main List</button>
        <button>My List</button>
      </div>
      <div className="border-b border-gray-200"><span>Average</span> <span>Rated</span> <span>Wants</span></div>
      {children.map((child, index) => (
        <div key={index} className="flex mt-4 w-full h-auto">
          {child}
        </div>
      ))}
    </div>
  )
}

function AdditionalInfo() {
  return (
    <div className="flex mt-2 lg:mt-4 md:w-11/12 lg:w-10/12 flex-col ">
      <div className="text-sky-700 font-bold text-xl md:text-3xl">Douban EN</div>
      <div className="text-gray-500">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, doloremque est.
          Maxime repudiandae odit ad, ratione aliquid doloribus sint quas similique
          natus laudantium adipisci recusandae eum consequatur ullam unde repellat.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, doloremque est.
          Maxime repudiandae odit ad, ratione aliquid doloribus sint quas similique
          natus laudantium adipisci recusandae eum consequatur ullam unde repellat.</p>
      </div>
      <div className="bg-sky-700">
        <button>Know More</button>
      </div>
    </div>
  )
}
