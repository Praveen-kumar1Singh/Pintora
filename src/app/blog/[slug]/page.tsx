import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getRelatedPosts } from '@/lib/mock-blog';
import { ArrowLeft, Clock, Calendar, Link2, ArrowRight, Share2, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Printora Editorial`,
    description: post.excerpt,
  }
}

export default async function BlogDetailsPage(props: Props) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 2);

  return (
    <article className="pb-24">
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] min-h-[400px] bg-muted">
        <Image 
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute top-8 left-4 lg:left-8 z-10">
          <Link href="/blog" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Editorial
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto -mt-32 relative z-20 bg-background p-8 md:p-12 lg:p-16 rounded-xl shadow-2xl border">
          {/* Article Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <span className="text-primary">{post.category}</span>
              <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</span>
              <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
              <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {post.excerpt}
            </p>
          </div>

          {/* Author Info */}
          <div className="flex items-center justify-center gap-4 py-8 border-y mb-12">
            <div className="relative w-14 h-14 rounded-full overflow-hidden">
              <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold uppercase tracking-wide">{post.author.name}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-widest">{post.author.role}</p>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-blockquote:border-l-primary prose-blockquote:font-medium prose-blockquote:text-2xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Links */}
          <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-6">
            <h4 className="font-bold uppercase tracking-widest text-sm">Share this article</h4>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full"><Share2 className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><MessageCircle className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Mail className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Link2 className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <section className="bg-foreground text-background py-24 mt-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Stay in the loop</h2>
          <p className="text-background/80 mb-8 text-lg">Subscribe to get the latest drops, editorial features, and exclusive offers directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 h-12 px-4 bg-background text-foreground outline-none rounded-none"
              required
            />
            <Button type="submit" variant="secondary" className="h-12 uppercase tracking-widest font-bold px-8 rounded-none">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 mt-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Read More</h2>
            <Link href="/blog" className="hidden sm:flex items-center text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-full sm:w-48 aspect-[4/3] bg-muted rounded-lg overflow-hidden shrink-0">
                  <Image 
                    src={relatedPost.coverImage}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">{relatedPost.category}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:underline underline-offset-4 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm mb-4">
                    {relatedPost.excerpt}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest flex items-center">
                    Read <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
