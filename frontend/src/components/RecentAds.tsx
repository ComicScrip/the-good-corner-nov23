import AdCard from "./AdCard";
import { gql, useQuery } from "@apollo/client";

const GET_RECENT_ADS = gql`
  query Ads {
    ads {
      id
      title
      price
      picture
    }
  }
`;

type RecentAd = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

export default function RecentAds() {
  const { data } = useQuery<{ ads: RecentAd[] }>(GET_RECENT_ADS);
  const ads = data?.ads || [];

  return (
    <div className="pt-6">
      <h2 className="text-2xl mb-6">Annonces récentes</h2>

      <section className="flex flex-wrap pb-24">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </section>
    </div>
  );
}
