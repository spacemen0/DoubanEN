import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  const items = [{}, {}, {}]
  return (

    <div className="flex ml-3 md:ml-6 lg:ml-12 mb-4">
      <div className="flex flex-col flex-1 md:flex-[0.7] md:mr-4">
        <FeaturedBanner />
        {children.map((child, index) => (
          <div key={index} className="flex mt-4 w-full h-auto ">
            {child}
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-[0.3] !md:hidden"> <FeaturedDisplay />
        <FeaturedList>{items.map(() => <div>bullshit</div>)}</FeaturedList>
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

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <a href="">
      <img src={src} alt={alt} className="w-full h-auto" />
    </a>
  );
}

function FeaturedDisplay() {
  return (
    <div className="flex flex-col max-w-full mt-4">
      <div className="mb-4">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Big Image" />
      </div>

      <div className="flex justify-between mb-4">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 1" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 2" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 3" />
      </div>

      <div className="flex justify-between">
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 4" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 5" />
        <Image src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Image 6" />
      </div>
    </div>
  );
}

function FeaturedList({ children }: { children: ReactNode[] }) {
  return (
    <div className="md:flex hidden flex-col flex-[0.3]">
      <div className="text-sky-700 font-bold text-xl md:text-3xl">Featured List</div>
      <div className="flex gap-2">
        <button>Main List</button>
        <button>My List</button>
      </div>
      <div className="border-b border-gray-200"><span>Average</span> <span>Rated</span> <span>Wants</span></div>
      {children.map((child, index) => (
        <div key={index} className="flex mt-4 w-full h-auto ">
          {child}
        </div>
      ))}
    </div>
  )
}

function AdditionalInfo() {
  return (
    <div className="md:flex hidden flex-col flex-[0.3]">
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
