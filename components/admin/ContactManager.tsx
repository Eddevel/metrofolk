// components/admin/ContactManager.tsx
"use client";

import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MessageSquare, Trash2, User, Calendar, CheckCircle2 } from "lucide-react";

export default function ContactManager() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
      setContacts(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const deleteContact = async (id: string) => {
    if (confirm("Delete this message permanently?")) {
      await deleteDoc(doc(db, "contacts", id));
    }
  };

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Mail className="h-8 w-8 text-primary" />
            Contact Messages
          </h1>
          <p className="text-muted-foreground mt-2">
            All inquiries from your website contact form
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {contacts.length} Total
        </Badge>
      </div>

      {contacts.length === 0 ? (
        <Card className="p-12 text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground">No messages yet</h3>
          <p className="text-muted-foreground mt-2">
            When customers contact you, their messages will appear here.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {contacts.map((contact) => (
            <Card key={contact.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="bg-muted/50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{contact.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(contact.createdAt, "MMM d, yyyy • h:mm a")}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteContact(contact.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="p-6">
                <div className="flex items-start gap-2 mb-2">
                  <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium mb-1">Message:</p>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                </div>

                {contact.subject && (
                  <div className="mt-4 flex items-center gap-2">
                    <Badge variant="outline">{contact.subject}</Badge>
                  </div>
                )}
              </div>

              <div className="bg-muted/30 px-6 py-3 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Received {format(contact.createdAt, "EEEE, MMMM d, yyyy 'at' h:mm a")}
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Name: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || "N/A"}\nMessage: ${contact.message}`
                    );
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Copy Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}