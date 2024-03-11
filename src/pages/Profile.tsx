import { generateRandomData } from "../data";
import { PageHeader } from "../layouts/PageHeader";
import { Image } from "../components/Image";

export default function Profile() {
  return (
    <div className="">
      <PageHeader />
      Profile
      <Image {...generateRandomData()} />
      <Image {...generateRandomData()} />
    </div>
  );
}
