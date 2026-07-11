import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPost, getBlogPosts } from '@/lib/mock-blog';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Editorial | Printora',
  description: 'The latest in luxury streetwear, style guides, and fashion culture.',
};

export default function BlogListingPage() {
  const featuredPost = getFeaturedPost();
  const posts = getBlogPosts();

  const categories = ["All", "Style Guide", "Essentials", "Education", "Footwear", "Culture"];

  return (
    <div className="pb-24">
      {/* Blog Header */}
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Editorial</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Deep dives into luxury streetwear, styling essentials, and the culture shaping the fashion landscape today.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <Link href={`/blog/${featuredPost.slug}`} className="group block relative overflow-hidden rounded-xl">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-muted">
              <Image 
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-4 text-sm font-bold uppercase tracking-widest text-primary">
                <span>{featuredPost.category}</span>
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                <span className="flex items-center text-white/80"><Clock className="w-4 h-4 mr-1" /> {featuredPost.readTime}</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 max-w-4xl drop-shadow-lg">
                {featuredPost.title}
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl hidden md:block drop-shadow-md">
                {featuredPost.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Categories Filter */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar border-b">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                i === 0 ? 'bg-foreground text-background' : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
              <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-6">
                <Image 
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <span className="text-primary">{post.category}</span>
                <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:underline underline-offset-4 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm font-bold uppercase tracking-widest mt-auto">
                Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Button variant="outline" size="lg" className="uppercase tracking-widest font-semibold px-12 h-14">
            Load More Articles
          </Button>
        </div>
      </section>
    </div>
  );
}
