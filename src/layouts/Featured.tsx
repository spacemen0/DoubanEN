import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex flex-col mt-8 md:mt-12 ml-5 md:ml-12 lg:ml-24 items-start mb-4">
      <FeaturedBanner />
      {children.map((child, index) => (
        <div key={index} className="flex mt-4 w-[90vw] h-72 ">
          {child}
          <div className="bg-slate-500 flex-1 ">item</div>
        </div>
      ))}
    </div>
  );
}

function FeaturedBanner() {
  return (
    <a href="#">
      <div className="flex sm:hidden hover:bg-gray-100 transition-colors justify-center items-center">
        <div className="flex-auto w-32 h-32">
          <img src="https://e.snmc.io/i/600/w/62e535430e1b458faba554645469442c/11618017" alt="Best of 2023" />
        </div>
        <div className="px-2 h-32 font-bold text-sky-700 flex flex-col justify-center items-center">
          <h3>Douban EN Best of 2023</h3>
        </div>
      </div>
    </a>
  )

}
