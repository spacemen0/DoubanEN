import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";

export default function Music() {
  const { id } = useParams();
  return (
    <>
      <PageHeader />
      <p>Music {id}</p>
    </>
  );
}
