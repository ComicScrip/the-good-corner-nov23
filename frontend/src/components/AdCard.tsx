export type AdCardProps = {
  price: number;
  title: string;
  pictureUrl: string;
  link: string;
};

export default function AdCard({
  title,
  price,
  pictureUrl,
  link,
}: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={pictureUrl} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </a>
    </div>
  );
}
