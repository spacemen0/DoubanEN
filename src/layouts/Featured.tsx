import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center max-h-screen overflow-auto bg-cyan-300 text-center h-20 mt-5 border-s-purple-500">
      {children}
    </div>
  );
}