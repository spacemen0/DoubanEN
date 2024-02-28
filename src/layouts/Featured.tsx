import { ReactNode } from "react";

export function Featured({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center max-h-screen overflow-auto bg-cyan-300 text-center mt-5 border-s-purple-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
