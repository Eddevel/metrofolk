// lib/blog.ts
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

// Define the blog post interface
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime?: string;
  image: string;
  featured?: boolean;
  content?: string;
}

// Helper: safely extract and type the data
function asBlogPost(docId: string, data: any): BlogPost {
  return {
    id: docId,
    slug: data.slug ?? "",
    title: data.title ?? "Untitled",
    excerpt: data.excerpt ?? "",
    author: data.author ?? "Anonymous",
    date: data.date ?? new Date().toISOString().split("T")[0],
    readTime: data.readTime,
    image: data.image ?? "/images/blog/placeholder.jpg",
    featured: data.featured === true,
    content: data.content,
  };
}

// Get all posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const snapshot = await getDocs(collection(db, "blog"));
    return snapshot.docs.map((doc) => asBlogPost(doc.id, doc.data()));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Get single post by slug (optimized)
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const q = query(collection(db, "blog"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return asBlogPost(doc.id, doc.data());
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}