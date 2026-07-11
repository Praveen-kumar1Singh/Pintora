export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "evolution-of-streetwear-2026",
    title: "The Evolution of Luxury Streetwear in 2026",
    excerpt: "How high fashion and underground skate culture have finally merged into a singular, undeniable aesthetic dominating the runways.",
    content: `
      <p>Streetwear is no longer just a subculture; it is the culture. Over the last decade, we have seen a dramatic shift in how luxury houses approach everyday wear. The lines between high fashion and underground skate culture have completely dissolved.</p>
      
      <h2>The Shift in Proportions</h2>
      <p>One of the most noticeable trends in 2026 is the extreme shift in proportions. Oversized silhouettes are no longer just 'baggy'—they are architecturally constructed. Shoulders are dropped, but the hems are cropped. Fabrics are heavier, with 400 GSM cotton becoming the standard for any brand worth its salt.</p>
      
      <h2>Sustainability meets Utility</h2>
      <p>Luxury streetwear is now deeply intertwined with utility and sustainability. Brands are utilizing recycled nylons, organic heavy-weight cottons, and biodegradable packaging. The modern consumer demands transparency, and fashion houses are responding with traceable supply chains.</p>

      <blockquote>"The future of fashion isn't about looking expensive. It's about looking effortless while wearing something that took 100 hours to construct."</blockquote>
      
      <p>As we move into the colder months, expect to see an influx of muted earth tones mixed with hyper-vibrant neon accents. The contrast is jarring, yet perfectly encapsulates the chaos of modern city life.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2787&auto=format&fit=crop",
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      role: "Editor in Chief"
    },
    category: "Style Guide",
    date: "Aug 15, 2026",
    readTime: "4 min read",
    featured: true
  },
  {
    id: "2",
    slug: "essential-wardrobe-pieces",
    title: "5 Essential Pieces for the Minimalist Wardrobe",
    excerpt: "Building a versatile, timeless wardrobe doesn't require a lot of clothes—just the right ones. Here is our guide to the ultimate minimal capsule.",
    content: "<p>Minimalism isn't about having less; it's about making room for more of what matters...</p>",
    coverImage: "https://images.unsplash.com/photo-1434389678232-0690a42db4d3?q=80&w=2833&auto=format&fit=crop",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
      role: "Senior Stylist"
    },
    category: "Essentials",
    date: "Aug 10, 2026",
    readTime: "3 min read"
  },
  {
    id: "3",
    slug: "understanding-fabric-weights",
    title: "Understanding Fabric Weights: Why GSM Matters",
    excerpt: "Ever wondered why some t-shirts drape perfectly while others cling awkwardly? The secret lies in the fabric's GSM.",
    content: "<p>GSM stands for Grams per Square Meter. It is the metric used to measure the weight and density of a fabric...</p>",
    coverImage: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=2772&auto=format&fit=crop",
    author: {
      name: "Marcus Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
      role: "Product Developer"
    },
    category: "Education",
    date: "Aug 02, 2026",
    readTime: "5 min read"
  },
  {
    id: "4",
    slug: "sneaker-trends-fall-winter",
    title: "Sneaker Trends to Watch this Fall/Winter",
    excerpt: "From chunky trail runners to sleek, retro low-tops. Here are the silhouettes that will dominate the streets this season.",
    content: "<p>The sneaker landscape is shifting again. We are moving away from the hyper-futuristic designs of last year...</p>",
    coverImage: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2940&auto=format&fit=crop",
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
      role: "Editor in Chief"
    },
    category: "Footwear",
    date: "Jul 28, 2026",
    readTime: "6 min read"
  }
];

export const getFeaturedPost = () => mockBlogPosts.find(post => post.featured) || mockBlogPosts[0];
export const getBlogPosts = () => mockBlogPosts.filter(post => !post.featured);
export const getPostBySlug = (slug: string) => mockBlogPosts.find(post => post.slug === slug);
export const getRelatedPosts = (slug: string, limit = 2) => mockBlogPosts.filter(post => post.slug !== slug).slice(0, limit);
