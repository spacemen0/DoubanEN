import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/PageHeader";

export default function Book() {
  const { id } = useParams();
  return (
    <>
      <PageHeader />
      <p>Book {id}</p>
    </>
  );
}
