// components/admin/QuoteManager.tsx
"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin } from "lucide-react";

export default function QuoteManager() {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setQuotes(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "quotes", id), { status });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Quote Requests</h2>
        <p className="text-muted-foreground">{quotes.length} total leads</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Bill</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {quotes.map((q) => (
            <TableRow key={q.id}>
              <TableCell className="font-medium">{q.name}</TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <a href={`tel:${q.phone}`}>{q.phone}</a>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {q.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {q.location}
                </div>
              </TableCell>
              <TableCell className="font-semibold">₦{q.currentBill}</TableCell>
              <TableCell className="text-muted-foreground">
                {q.createdAt?.toDate?.() && format(q.createdAt.toDate(), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Select value={q.status || "new"} onValueChange={(v) => updateStatus(q.id, v)}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new"><Badge variant="secondary">New</Badge></SelectItem>
                    <SelectItem value="contacted"><Badge className="bg-yellow-500">Contacted</Badge></SelectItem>
                    <SelectItem value="quoted"><Badge className="bg-blue-500">Quoted</Badge></SelectItem>
                    <SelectItem value="converted"><Badge className="bg-green-500">Converted</Badge></SelectItem>
                    <SelectItem value="lost"><Badge variant="destructive">Lost</Badge></SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {quotes.length === 0 && (
        <p className="text-center py-12 text-muted-foreground">No quote requests yet.</p>
      )}
    </div>
  );
}