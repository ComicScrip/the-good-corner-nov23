import { useEffect, useState } from "react";
import AdCard from "./AdCard";
import axios from "axios";
import { Ad } from "@/types";

export default function RecentAds() {
  const [ads, setAds] = useState<Ad[]>([]);

  useEffect(() => {
    axios
      .get<Ad[]>("http://localhost:4000/ads")
      .then((res) => {
        setAds(res.data);
      })
      .catch(console.error);
  }, []);

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
