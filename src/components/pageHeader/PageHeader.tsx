import loadable from "@loadable/component";

const HeaderLogoSection = loadable(() => import("./HeaderLogoSection.tsx"));
const HeaderNavBarSection = loadable(() => import("./HeaderNavBarSection.tsx"));
const HeaderSearchBarSection = loadable(
  () => import("./HeaderSearchBarSection.tsx"),
);
const HeaderUserSection = loadable(() => import("./HeaderUserSection.tsx"));

export function PageHeader() {
  return (
    <div className="z-50 flex flex-col border-b bg-white shadow-md">
      <div className="flex h-12 items-center justify-center gap-1 md:h-14 lg:gap-2">
        <HeaderLogoSection />
        <HeaderNavBarSection forMedium={true} />
        <HeaderSearchBarSection />
        <HeaderUserSection />
      </div>
      <HeaderNavBarSection forMedium={false} />
    </div>
  );
}
