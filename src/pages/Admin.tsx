import { PageHeader } from "../components/pageHeader/PageHeader.tsx";
import { Footer } from "../components/common/Footer.tsx";

export default function Admin() {
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">
        Admin page
        <Footer />
      </div>
    </div>
  );
}
