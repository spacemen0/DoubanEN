import { SideDisplay } from "./SideDisplay";
import { SideList } from "./SideList";
import { SideInfo } from "./SideInfo";
import { FeaturedBanner } from "./FeaturedBanner";
import { homePageReviewIds } from "../../utils/data";
import { FeaturedItem } from "./FeaturedItem";
import { useEffect, useState } from "react";
import { Media, Review } from "../../utils/type.ts";
import { useAuthContext } from "../../contexts/AuthContext.ts";
import { fetchSingleReview } from "../../apiUtils/reviewApiUtil.ts";
import { getMedia } from "../../apiUtils/mediaApiUtil.ts";
import { ActiveUsers } from "./ActiveUsers.tsx";

export function Featured() {
  const [featuredItems, setFeaturedItems] = useState<
    {
      media: Media;
      review: Review;
    }[]
  >([]);
  const { setMessage } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (const id of homePageReviewIds) {
          const review = await fetchSingleReview(id);
          const media = await getMedia(review.mediaId);
          setFeaturedItems((prevState) => [
            ...prevState,
            { media: media, review: review },
          ]);
        }
      } catch (e) {
        const error = e as Error;
        setMessage(error.message);
      }
    };

    fetchData().then();
  }, [setMessage]);

  return (
    <div className="mb-4 flex bg-white pl-3 md:pl-6 lg:pl-12">
      <div className="mr-4 flex flex-1 flex-col lg:flex-[0.65]">
        <FeaturedBanner />

        {featuredItems.map((item, index) => (
          <div key={index} className="mt-4 flex h-auto w-full justify-start">
            <FeaturedItem media={item.media} review={item.review} />
          </div>
        ))}

        <div className="mr-4 flex flex-col lg:hidden">
          <SideDisplay />
          <SideList />
          <ActiveUsers />
          <SideInfo />
        </div>
      </div>
      <div className="flex flex-col flex-[0.35]  items-center justify-start !lg:hidden">
        <SideDisplay />
        <SideList />
        <ActiveUsers />
        <SideInfo />
      </div>
    </div>
  );
}
