import { useRecentAdsQuery } from "@/graphql/generated/schema";
import AdCard from "./AdCard";

export default function RecentAds() {
  const { data } = useRecentAdsQuery();
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
