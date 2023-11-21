import AdCard, { AdCardProps } from "./AdCard";

export default function RecentAds() {
  const ads: AdCardProps[] = [
    {
      id: 1,
      link: "/ads/table",
      pictureUrl: "/images/table.webp",
      title: "Table",
      price: 120,
    },
    {
      id: 2,
      link: "/ads/dame-jeanne",
      pictureUrl: "/images/dame-jeanne.webp",
      title: "Dame-jeanne",
      price: 75,
    },
  ];

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad, idx) => (
          <AdCard
            key={idx}
            title={ad.title}
            price={ad.price}
            pictureUrl={ad.pictureUrl}
            link={ad.link}
          />
        ))}

        <div className="ad-card-container">
          <a className="ad-card-link" href="/ads/vide-poche">
            <img className="ad-card-image" src="/images/vide-poche.webp" />
            <div className="ad-card-text">
              <div className="ad-card-title">Vide-poche</div>
              <div className="ad-card-price">4 €</div>
            </div>
          </a>
        </div>
        <div className="ad-card-container">
          <a className="ad-card-link" href="/ads/vaisselier">
            <img className="ad-card-image" src="/images/vaisselier.webp" />
            <div className="ad-card-text">
              <div className="ad-card-title">Vaisselier</div>
              <div className="ad-card-price">900 €</div>
            </div>
          </a>
        </div>
        <div className="ad-card-container">
          <a className="ad-card-link" href="/ads/bougie">
            <img className="ad-card-image" src="/images/bougie.webp" />
            <div className="ad-card-text">
              <div className="ad-card-title">Bougie</div>
              <div className="ad-card-price">8 €</div>
            </div>
          </a>
        </div>
        <div className="ad-card-container">
          <a className="ad-card-link" href="/ads/porte-magazine">
            <img className="ad-card-image" src="/images/porte-magazine.webp" />
            <div className="ad-card-text">
              <div className="ad-card-title">Porte-magazine</div>
              <div className="ad-card-price">45 €</div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
