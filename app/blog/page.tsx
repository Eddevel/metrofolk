// app/blog/page.tsx
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export const revalidate = 60; // Refresh every minute

export default async function BlogPage() {
  const q = query(collection(db, "blogPosts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];

  const featured = posts.find(p => p.featured);
  const regular = posts.filter(p => !p.featured);

  return (
    <>
      {/* Hero - unchanged */}
      <section className="bg-gradient-to-b from-background to-muted/30">
        <section className="relative overflow-hidden bg-gradient-to-r from-secondary py-10">
          <div className="absolute inset-0 bg-black/80" />
          <div className="absolute inset-0">
            <Image
              src="/images/2.svg"
              loading="eager"
              alt="Metrofolk"
              fill
              className=" opacity-30"
              priority
            />
          </div>
          <div className="relative container mx-auto px-5 text-center text-white">
            <Badge className="mb-4">Blog</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Metrofolk Blog</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Latest insights on renewable energy, solar technology, and electrical engineering in Nigeria.
            </p>
          </div>
        </section>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="py-10 bg-muted/50">
          <div className="container px-4 mx-auto">
            <Link href={`/blog/${featured.slug}`}>
              <article className="grid md:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden shadow-xl bg-background cursor-pointer hover:shadow-2xl transition-shadow">
                <div className="relative h-96 md:h-full">
                  <Image
                    src={featured.imageUrl || "/images/blog/placeholder.jpg"}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-8 md:p-12">
                  <span className="text-sm text-primary font-semibold uppercase tracking-wider">Featured Post</span>
                  <h2 className="text-3xl font-bold mt-2 mb-4">{featured.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{featured.excerpt || featured.content?.slice(0, 150) + "..."}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featured.author}</span>
                    <span>•</span>
                    <span>{format(featured.createdAt?.toDate() || new Date(), "MMMM d, yyyy")}</span>
                    {featured.readTime && (
                      <>
                        <span>•</span>
                        <span>{featured.readTime}</span>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Articles</h2>
          {regular.length === 0 ? (
            <p className="text-center text-muted-foreground text-xl">No posts yet. Check back soon!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((post: any) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all bg-card cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.imageUrl || "/images/blog/placeholder.jpg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt || post.content?.replace(/<[^>]*>/g, '').slice(0, 120) + "..."}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{post.author}</span>
                        <span>{format(post.createdAt?.toDate() || new Date(), "MMM d, yyyy")}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}