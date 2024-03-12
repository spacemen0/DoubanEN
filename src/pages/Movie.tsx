import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";

export default function Movie() {
  const { id } = useParams();
  return (
    <>
      <PageHeader />
      <p>Movie {id}</p>
    </>
  );
}
