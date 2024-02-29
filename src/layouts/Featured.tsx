import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex flex-col mt-8 md:mt-12 ml-3 md:ml-6 lg:ml-12 items-start mb-4">
      <FeaturedBanner />
      {children.map((child, index) => (
        <div key={index} className="flex mt-4 w-full h-72 ">
          {child}
          {(index == 0) && <div className="bg-slate-500 hidden md:block flex-[0.33] ">Featured Pics</div>}
          {(index == 1) && <div className="bg-slate-500 hidden md:block flex-[0.33] ">Lists</div>}
          {(index == 2) && <div className="bg-slate-500 hidden md:block flex-[0.33] ">Additional Information</div>}
          {(index > 2) && <div className="bg-transparent hidden md:block flex-[0.33] "></div>}
        </div>
      ))}
    </div>
  );
}

function FeaturedBanner() {
  return (
    <a href="#">
      <div className="flex md:hidden w-full hover:bg-gray-100 transition-colors justify-start items-center">
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
