import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex flex-col mt-24 ml-5 md:ml-24 items-start mb-4">
      {children.map((child, index) => (

        <div key={index} className="flex mt-4 w-[90vw] h-72 ">
          {child}
          <div className="bg-slate-500 flex-1 ">item</div>
        </div>



      ))}
    </div>
  );
}
