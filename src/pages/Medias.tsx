import { useParams } from "react-router-dom";
import { PageHeader } from "../layouts/common/PageHeader";
import { NotFound } from "../layouts/common/NotFound";

export default function Medias() {
  const { type } = useParams();
  if (!["music", "movie", "book"].includes(type!)) {
    return <NotFound />;
  }
  return (
    <>
      <PageHeader />
      <p>{type}</p>
    </>
  );
}
