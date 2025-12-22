// components/admin/BlogManager.tsx
"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Pencil, Trash2, Loader2 } from "lucide-react";

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    author: "Metrofolk Team",
    readTime: "",
    featured: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real-time listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "blogPosts"), (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (form.title && !editingId) {
      const slug = form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setForm(prev => ({ ...prev, slug }));
    }
  }, [form.title, editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug) return alert("Title is required for slug");

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        createdAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "blogPosts", editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "blogPosts"), payload);
      }

      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        imageUrl: "",
        author: "Metrofolk Team",
        readTime: "",
        featured: false,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (post: any) => {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      imageUrl: post.imageUrl || "",
      author: post.author || "Metrofolk Team",
      readTime: post.readTime || "",
      featured: post.featured || false,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      author: "Metrofolk Team",
      readTime: "",
      featured: false,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Form */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Post" : "Add New Blog Post"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            placeholder="Post Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <Input
            placeholder="Slug (auto-generated)"
            value={form.slug}
            disabled
            className="bg-muted"
          />

          <Input
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />

          <Textarea
            placeholder="Short excerpt (for blog list)"
            rows={3}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />

          <Textarea
            placeholder="Full content (use HTML: <p>, <h2>, <ul>, etc.)"
            rows={10}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
            <Input
              placeholder="Read time (e.g. 5 min read)"
              value={form.readTime}
              onChange={(e) => setForm({ ...form, readTime: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-5 w-5"
            />
            <label htmlFor="featured" className="font-medium">
              Featured Post
            </label>
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingId ? "Update Post" : "Create Post"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      {/* Posts List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">All Blog Posts ({posts.length})</h2>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet. Create your first one!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    /{post.slug} • {post.readTime}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(post)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => confirm("Delete this post?") && deleteDoc(doc(db, "blogPosts", post.id))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}