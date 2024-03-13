import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";

export default function List() {
  const { id } = useParams();
  return (
    <div className="">
      <PageHeader />
      List: {id}
    </div>
  );
}
