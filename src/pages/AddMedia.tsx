import { PageHeader } from "../components/common/PageHeader.tsx";

export default function AddMedia() {
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">
        <h1 className="mx-auto font-bold text-3xl w-fit">Add Media</h1>
      </div>
    </div>
  );
}
