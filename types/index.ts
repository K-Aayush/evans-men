export type Category =
  | 'shirts'
  | 'tshirts'
  | 'trousers'
  | 'denim'
  | 'jackets'
  | 'blazers'
  | 'sneakers'
  | 'loafers';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  categoryLabel: string;
  price: number;
  description: string;
  details: string;
  material: string;
  fit: string;
  colors: string[];
  sizes: string[];
  images: string[];
  featured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}
