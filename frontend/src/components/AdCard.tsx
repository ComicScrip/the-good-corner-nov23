import { useEffect } from "react";

export type AdCardProps = {
  id: number;
  price: number;
  title: string;
  picture: string;
  link: string;
};

export default function AdCard({ title, price, picture, link }: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </a>
    </div>
  );
}
