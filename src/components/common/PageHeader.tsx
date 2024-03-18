import loadable from '@loadable/component'

const HeadLogoSection = loadable(()=>import("./pageHeader/HeaderLogoSection.tsx"))
const HeaderNavBarSection = loadable(()=>import("./pageHeader/HeaderNavBarSection.tsx"))
const HeaderSearchBarSection = loadable(()=>import("./pageHeader/HeaderSearchBarSection.tsx"))
const HeaderUserSection = loadable(()=>import("./pageHeader/HeaderUserSection.tsx"))
export function PageHeader() {
    return (
        <div className="flex flex-col border-b bg-white shadow-md">
            <div className="flex h-12 items-center justify-center gap-1 md:h-14 lg:gap-2">
                <HeadLogoSection/>
                <HeaderNavBarSection forMedium={true}/>
                <HeaderSearchBarSection/>
                <HeaderUserSection/>
            </div>
            <HeaderNavBarSection forMedium={false}/>
        </div>
    );
}

