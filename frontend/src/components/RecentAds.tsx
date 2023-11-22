import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import axios from "axios";

export default function RecentAds() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [ads, setAds] = useState<AdCardProps[]>([]);

  useEffect(() => {
    axios
      .get<AdCardProps[]>("http://localhost:4000/ads")
      .then((res) => {
        setAds(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>prix total : {totalPrice}</p>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              title={ad.title}
              price={ad.price}
              picture={ad.picture}
              link={ad.link}
            />
            <button
              onClick={() => {
                setTotalPrice((oldTotal) => oldTotal + ad.price);
              }}
            >
              Ajouter
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
