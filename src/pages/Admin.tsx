import { PageHeader } from "../components/common/PageHeader.tsx";

export default function Admin() {
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">Admin page</div>
    </div>
  );
}
