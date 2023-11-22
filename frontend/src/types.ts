export type Ad = {
  id: number;
  title: string;
  price: number;
  picture: string;
};

export type Category = {
  id: number;
  name: string;
};

export type AdDetails = Ad & {
  location: string;
  owner: string;
  description: string;
  createdAt: string;
};
