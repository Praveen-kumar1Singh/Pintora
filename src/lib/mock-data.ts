export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
  stock: number;
  material: string;
  category: string;
};

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 100 }).map((_, i) => {
  const categories = ['Oversized Tees', 'Hoodies', 'Shirts', 'Joggers', 'Caps', 'Accessories'];
  const category = categories[i % categories.length];
  
  return {
    id: `prod_${i + 1}`,
    name: `Premium ${category} - ${i + 1}`,
    slug: `premium-${category.toLowerCase().replace(' ', '-')}-${i + 1}`,
    description: `Experience the ultimate comfort and luxury with our Premium ${category}. Made with the finest materials and crafted to perfection.`,
    price: Math.floor(Math.random() * (5000 - 999 + 1)) + 999,
    discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined, // 10% to 40% discount
    images: [
      `https://picsum.photos/seed/${i * 10 + 1}/800/1000`,
      `https://picsum.photos/seed/${i * 10 + 2}/800/1000`,
      `https://picsum.photos/seed/${i * 10 + 3}/800/1000`,
    ],
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)), // 3.5 to 5.0
    reviews: Math.floor(Math.random() * 500) + 10,
    colors: ['Black', 'White', 'Electric Blue', 'Grey'],
    sizes: category === 'Caps' || category === 'Accessories' ? ['One Size'] : ['S', 'M', 'L', 'XL', 'XXL'],
    stock: Math.floor(Math.random() * 100),
    material: '100% Premium Cotton',
    category,
  };
});

export const getProductsByCategory = (category: string) => {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
};

export const getProductBySlug = (slug: string) => {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
};
