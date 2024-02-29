import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode[] }) {
  return (
    <div className="flex flex-col justify-center items-center border-s-purple-500 mb-4">
      {children.map((child, index) => (
        <div key={index} className="mt-4">
          {child}
        </div>
      ))}
    </div>
  );
}
