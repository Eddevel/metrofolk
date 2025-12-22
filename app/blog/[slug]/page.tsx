// app/blog/[slug]/page.tsx — FINAL 100% WORKING VERSION
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

// Add this to fix Turbopack crash
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>; // ← This is the KEY fix for Next 16
}) {
  // Safely unwrap params (Next.js 16 App Router requires this)
  const { slug } = await params;

  // Safety check — if slug is missing or empty
  if (!slug || slug === "undefined") {
    notFound();
  }

  try {
    const q = query(
      collection(db, "blogPosts"),
      where("slug", "==", slug),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      notFound();
    }

    const post = snapshot.docs[0].data();

    return (
      <article className="container py-20 max-w-4xl mx-auto px-5">
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          {post.title || "Untitled Post"}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-10 text-lg">
          <span className="font-medium">{post.author || "Metrofolk Team"}</span>
          <span>•</span>
          <time>
            {post.createdAt?.toDate?.()
              ? format(post.createdAt.toDate(), "MMMM d, yyyy")
              : "Date not set"}
          </time>
          {post.readTime && (
            <>
              <span>•</span>
              <span className="text-primary">{post.readTime}</span>
            </>
          )}
        </div>

        {post.imageUrl && (
          <div className="relative h-96 mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={post.imageUrl}
              alt={post.title || "Blog post"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-foreground/90 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{
            __html: post.content || "<p>No content available.</p>",
          }}
        />
      </article>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}