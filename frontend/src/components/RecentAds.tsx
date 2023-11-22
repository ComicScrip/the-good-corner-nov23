import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";

export default function RecentAds() {
  const ads: AdCardProps[] = [
    {
      link: "/ads/table",
      pictureUrl: "/images/table.webp",
      title: "Table",
      price: 120,
    },
    {
      link: "/ads/dame-jeanne",
      pictureUrl: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      price: 75,
    },
  ];

  const [totalPrice, setTotalPrice] = useState(0);

  console.log("rerender");

  useEffect(() => {
    setTotalPrice(1);
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <p>prix total : {totalPrice}</p>
      <section className="recent-ads">
        {ads.map((ad, idx) => (
          <div key={idx}>
            <AdCard
              title={ad.title}
              price={ad.price}
              pictureUrl={ad.pictureUrl}
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
