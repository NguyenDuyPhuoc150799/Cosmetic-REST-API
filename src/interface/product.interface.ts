export interface IProduct {
  id: string;
  code: string;
  name: string;
  size?: number;
  color?: string;
  description?: string;
  price: number;
  quantity: number;
  point?: number;
  detail?: string;
  promotion?: number;
}
