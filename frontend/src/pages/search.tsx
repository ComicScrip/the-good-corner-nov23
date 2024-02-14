import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import AdCard from "@/components/AdCard";
import { useSearchAdsQuery } from "@/graphql/generated/schema";

export default function Search() {
  const router = useRouter();
  const categoryId =
    typeof router.query.categoryId === "string"
      ? parseInt(router.query.categoryId)
      : undefined;
  const titleOfAds =
    typeof router.query.title === "string" ? router.query.title : undefined;
  const { data } = useSearchAdsQuery({
    variables: {
      categoryId,
      title: titleOfAds,
    },
  });

  const ads = data?.ads || [];

  return (
    <Layout pageTitle="recherche - TGC">
      {ads.length === 0 && (
        <div>
          <p className="pb-4 pt-12">
            {" "}
            Aucune annonce ne corresspond à ces critères de recherche
          </p>

          <button
            className="btn btn-primary text-white"
            onClick={() => router.push("/search")}
          >
            Voir toutes les annonces
          </button>
        </div>
      )}

      <div className="pt-6 pb-20 flex flex-wrap">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </div>
    </Layout>
  );
}
