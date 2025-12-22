// components/admin/ProductManager.tsx — FINAL WORKING VERSION (products visible + mobile friendly)
"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Loader2, Image as ImageIcon, Search } from "lucide-react";

const CATEGORIES = [
  "low-voltage-panels",
  "medium-voltage-switchboard",
  "busbar-cable-management",
  "loose-components-retail",
  "green-energy",
  "packaged-equipment",
  "Inverters",
  "Solar Panels",
  "Batteries",
] as const;

type Category = typeof CATEGORIES[number];

const CATEGORY_LABELS: Record<Category, string> = {
  "low-voltage-panels": "Low Voltage Panels",
  "medium-voltage-switchboard": "Medium Voltage Switchgear",
  "busbar-cable-management": "Busbar & Cable Management",
  "loose-components-retail": "Loose Electrical Components",
  "green-energy": "Green Energy Solutions",
  "packaged-equipment": "Packaged Equipment",
  "Inverters": "Inverters",
  "Solar Panels": "Solar Panels",
  "Batteries": "Batteries",
};

const formSchema = z.object({
  name: z.string().min(2, "Name too short"),
  price: z.string().refine((v) => !isNaN(Number(v)) && Number(v) > 0, "Invalid price"),
  category: z.enum(CATEGORIES),
  description: z.string().min(10, "Description too short"),
  imageUrl: z.string().optional().nullable(),
  imageFile: z.any().optional(),
  stock: z.string().refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Invalid stock"),
});

type FormData = z.infer<typeof formSchema>;

const PRODUCTS_PER_PAGE = 10;

export default function ProductManager() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [displayedCount, setDisplayedCount] = useState(PRODUCTS_PER_PAGE);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "low-voltage-panels",
      description: "",
      imageUrl: "",
      stock: "10",
    },
  });

  const imageUrl = watch("imageUrl");
  const imageFile = watch("imageFile");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAllProducts(data);
    });
    return () => unsub();
  }, []);

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const visibleProducts = filteredProducts.slice(0, displayedCount);

  const loadMore = () => setDisplayedCount((prev) => prev + PRODUCTS_PER_PAGE);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const selectAllVisible = () => {
    const allVisibleIds = visibleProducts.map((p) => p.id);
    setSelectedIds(new Set(allVisibleIds));
  };

  const clearSelection = () => setSelectedIds(new Set());

  const bulkDelete = async () => {
    if (!selectedIds.size || !confirm(`Delete ${selectedIds.size} product(s)?`)) return;
    try {
      await Promise.all(Array.from(selectedIds).map((id) => deleteDoc(doc(db, "products", id))));
      clearSelection();
    } catch (e) {
      alert("Failed");
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setUploadProgress("");
    try {
      let finalImageUrl = data.imageUrl?.trim() || "";

      if (imageFile?.[0]) {
        setUploadProgress("Uploading image...");
        const file = imageFile[0];
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      const payload = {
        name: data.name.trim(),
        price: Number(data.price),
        category: data.category,
        description: data.description.trim(),
        imageUrl: finalImageUrl,
        stock: Number(data.stock),
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "products"), { ...payload, createdAt: serverTimestamp() });
      }

      reset();
      setUploadProgress("Saved!");
      setTimeout(() => setUploadProgress(""), 3000);
    } catch (e) {
      alert("Save failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const edit = (p: any) => {
    setEditingId(p.id);
    setValue("name", p.name);
    setValue("price", String(p.price));
    setValue("category", p.category);
    setValue("description", p.description);
    setValue("imageUrl", p.imageUrl || "");
    setValue("stock", String(p.stock ?? 10));
    setValue("imageFile", null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="min-h-screen  p-4">
      <div className="mx-auto max-w-7xl">
        {/* YOUR ORIGINAL LAYOUT */}
        <div className="grid lg:grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: FORM */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">{editingId ? "Edit" : "Add"} Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input placeholder="Product Name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input type="number" placeholder="Price (₦)" {...register("price")} />
                  {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
                <div>
                  <Input type="number" placeholder="Stock" {...register("stock")} />
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                </div>
              </div>

              <Select onValueChange={(v) => setValue("category", v as Category)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Textarea placeholder="Description" rows={4} {...register("description")} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

              <div className="space-y-4 border rounded-lg p-4 bg-muted/20">
                <div className="flex items-center gap-2 font-semibold">
                  <ImageIcon className="h-5 w-5" />
                  Product Image
                </div>
                <Input placeholder="https://..." {...register("imageUrl")} />
                <div className="text-center text-sm text-muted-foreground">OR</div>
                <Input type="file" accept="image/*" {...register("imageFile")} />
                {(imageUrl || imageFile?.[0]) && (
                  <img
                    src={imageFile?.[0] ? URL.createObjectURL(imageFile[0]) : imageUrl || ""}
                    alt="Preview"
                    className="mx-auto mt-4 h-48 w-full max-w-sm object-cover rounded-lg border"
                  />
                )}
              </div>

              {uploadProgress && <p className="text-green-600 font-medium text-center">{uploadProgress}</p>}

              <div className="flex gap-3">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingId ? "Update" : "Add"} Product
                </Button>
                {editingId && <Button type="button" variant="outline" onClick={cancelEdit}>Cancel</Button>}
              </div>
            </form>
          </Card>

          {/* RIGHT: TABLE */}
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Products ({filteredProducts.length})</h2>
              {selectedIds.size > 0 && (
                <div className="flex gap-3">
                  <Button variant="destructive" size="sm" onClick={bulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete ({selectedIds.size})
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearSelection}>Clear</Button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayedCount(PRODUCTS_PER_PAGE);
                    clearSelection();
                  }}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={(v) => {
                setSelectedCategory(v);
                setDisplayedCount(PRODUCTS_PER_PAGE);
                clearSelection();
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{CATEGORY_LABELS[c]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={visibleProducts.length > 0 && visibleProducts.every((p) => selectedIds.has(p.id))}
                        onCheckedChange={selectAllVisible}
                      />
                    </TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-gray-500">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    visibleProducts.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <Checkbox checked={selectedIds.has(p.id)} onCheckedChange={() => toggleSelect(p.id)} />
                        </TableCell>
                        <TableCell>
                          {p.imageUrl ? (
                            <img src={p.imageUrl} alt={p.name} className="w-16 h-16 object-cover rounded" />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>₦{Number(p.price).toLocaleString()}</TableCell>
                        <TableCell className={p.stock <= 0 ? "text-red-600 font-bold" : ""}>
                          {p.stock <= 0 ? "SOLD OUT" : p.stock}
                        </TableCell>
                        <TableCell>{CATEGORY_LABELS[p.category as Category] || p.category}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="ghost" onClick={() => edit(p)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => confirm("Delete?") && deleteDoc(doc(db, "products", p.id))}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {displayedCount < filteredProducts.length && (
              <div className="text-center mt-8">
                <Button onClick={loadMore} size="lg">
                  Load More ({filteredProducts.length - displayedCount} left)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}