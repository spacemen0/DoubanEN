import { generateRandomData } from "../data";
import { PageHeader } from "../layouts/PageHeader";
import { Image } from "../components/Image";

export default function Profile() {
  return (
    <div className="max-h-screen overflow-hidden flex flex-col ">
      <PageHeader />
      <div className="overflow-y-scroll">
        <div className="flex flex-col w-10/12 mx-auto mt-5 lg:mt-10">
          <div className="flex gap-10 justify-center max-h-screen items-center px-4 py-4 lg:py-8 bg-gray-100">
            <div className="w-24 md:w-32 lg:w-56">
              {" "}
              <Image {...generateRandomData()} />
            </div>

            <div className="flex flex-col justify-center items-center">
              <h1>User Name</h1>
              <h1>User Role</h1>
              <h1>Member Since</h1>
            </div>
            <CurrentOn></CurrentOn>
          </div>
          <Image {...generateRandomData()} />
          <Image {...generateRandomData()} />
          <Image {...generateRandomData()} />
          <Image {...generateRandomData()} />
        </div>
      </div>
    </div>
  );
}

function CurrentOn() {
  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-96  pb-6 pl-4 gap-2 items-center justify-center text-xl text-sky-600">
      <div className="flex flex-col  ">
        {" "}
        <h1 className=" font-bold text-center pb-3">Listening</h1>
        <div className="flex  text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
          </div>

          <div className=" ml-4 flex flex-col justify-center">
            {" "}
            <h1 className="font-bold ">Very Long Album Name</h1>
            <h1 className="">Artist Name</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col ">
        {" "}
        <h1 className=" font-bold text-center pb-3">Watching</h1>
        <div className=" flex  text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
          </div>
          <div className=" ml-4 flex flex-col justify-center">
            {" "}
            <h1 className="font-bold ">Very Long Movie Name</h1>
            <h1 className="">Director Name</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col  ">
        {" "}
        <h1 className="font-bold text-center pb-3">Reading</h1>
        <div className="flex  text-center">
          <div className="w-32">
            <Image {...generateRandomData()} />
          </div>
          <div className=" ml-4 flex flex-col justify-center">
            {" "}
            <h1 className="font-bold ">Very Long Book Name</h1>
            <h1 className="">Author Name</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
