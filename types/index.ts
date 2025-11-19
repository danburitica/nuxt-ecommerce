export interface Category {
    id: number;
    name: string;
    image: string;
  }
  
  export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
  }

  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
  }
  
  export interface ApiResponse<T> {
    data: T;
    error?: string | null;
  }