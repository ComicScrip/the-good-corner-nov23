import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Ad } from "@/types";
import AdCard from "@/components/AdCard";

export default function Search() {
  const router = useRouter();

  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    axios
      .get<Ad[]>(`http://localhost:4000/ads${window.location.search}`)
      .then((res) => setAds(res.data))
      .catch(console.error);
  }, [router.query.title, router.query.categoryId]);

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
