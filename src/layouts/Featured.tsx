import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  const items = [{}, {}, {}]
  return (
    <div className="flex flex-col mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 items-start mb-4">
      <FeaturedBanner />
      <div className="text-sky-700 font-bold text-xl  md:text-3xl">Featured Reviews</div>
      {children.map((child, index) => (
        <div key={index} className="flex mt-4 w-full h-auto ">
          {child}
          {(index == 0) && <FeaturedDisplay />}
          {(index == 1) && <FeaturedList>{items.map(() => <div>bullshit</div>)}</FeaturedList>}
          {(index == 2) && <div className="bg-slate-500 hidden lg:block flex-[0.33] ">Additional Information</div>}
          {(index > 2) && <div className="bg-transparent hidden md:block flex-[0.33] "></div>}
        </div>
      ))}
    </div>
  );
}


function FeaturedBanner() {
  return (
    <a href="#">
      <div className="flex lg:hidden hover:bg-gray-100 transition-colors justify-start items-center mb-4">
        <div className="flex-1 w-32 h-32 sm:h-48 sm:w-48">
          <img src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Best of 2023" />
        </div>
        <div className="px-2 h-32 sm:h-48 sm:text-2xl w-auto font-bold text-sky-700 flex flex-col justify-center items-center">
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
    <div className="flex flex-col flex-[0.3]">
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
    <div className="flex flex-col">
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
