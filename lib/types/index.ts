export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[]; // Array of Supabase Storage URLs
  category: string;
  collection_id: string | null;
  in_stock: boolean;
  created_at: string;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  is_active: boolean;
  created_at: string;
}

export interface LookbookItem {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size: string | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  items: OrderItem[];
  total_amount: number;
  currency: 'NGN' | 'BTC' | 'USDT';
  payment_method: 'paystack' | 'btc' | 'usdt';
  payment_status: 'pending' | 'confirmed' | 'failed';
  order_status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  tx_hash: string | null; // For crypto orders
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string | null;
}

export interface VisitorLog {
  id: string;
  session_id: string;
  page: string;
  device_type: string | null;
  visited_at: string;
}
