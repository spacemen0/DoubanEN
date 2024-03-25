import { PageHeader } from "../components/common/PageHeader";
import { useParams } from "react-router-dom";

export default function Author() {
  const { id } = useParams();
  return (
    <div className="flex max-h-screen flex-col overflow-hidden">
      <PageHeader />
      <div className="overflow-y-scroll">Author {id}</div>
    </div>
  );
}
