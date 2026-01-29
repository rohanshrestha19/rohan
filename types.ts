
export enum Category {
  Sneakers = 'Sneakers',
  Sports = 'Sports',
  Casual = 'Casual'
}

export type Gender = 'Men' | 'Women' | 'Unisex';

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
  gender: Gender;
  description: string;
  image: string;
  images: string[];
  sizes: number[];
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'credit' | 'paypal';
}
