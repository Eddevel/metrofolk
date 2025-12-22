// components/admin/AnalyticsDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { format, subDays } from "date-fns"; // ← Only these
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, PhoneCall, DollarSign, MapPin, Calendar } from "lucide-react";

interface DayData {
  day: string;
  count: number;
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    converted: 0,
    revenue: 0,
    topCity: "N/A",
    avgBill: 0,
  });
  const [chart, setChart] = useState<DayData[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "quotes"), (snap) => {
      const quotes = snap.docs.map((d) => d.data());

      const today = new Date();
      const todayStr = today.toDateString();

      const todayCount = quotes.filter(
        (q) => q.createdAt?.toDate?.().toDateString() === todayStr
      ).length;

      const converted = quotes.filter((q) => q.status === "converted").length;
      const revenue = converted * 2500000;

      // Top city
      const cityMap: Record<string, number> = {};
      quotes.forEach((q) => {
        const city = q.location?.split(",")[0]?.trim() || "Unknown";
        cityMap[city] = (cityMap[city] || 0) + 1;
      });
      const topCity =
        Object.entries(cityMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

      // Avg bill
      const bills = quotes
        .map((q) => parseInt(q.currentBill || "0", 10))
        .filter((b) => b > 0);
      const avgBill = bills.length
        ? Math.round(bills.reduce((a, b) => a + b, 0) / bills.length)
        : 0;

      // Last 30 days – manual loop (no eachDayOfInterval)
      const last30Days: DayData[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = date.toDateString();
        const count = quotes.filter(
          (q) => q.createdAt?.toDate?.().toDateString() === dateStr
        ).length;
        last30Days.push({
          day: format(date, "MMM d"),
          count,
        });
      }

      setChart(last30Days);
      setStats({ total: quotes.length, today: todayCount, converted, revenue, topCity, avgBill });
    });

    return () => unsub();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Live business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Leads
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Today
            </CardTitle>
            <PhoneCall className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+{stats.today}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Converted
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {stats.converted}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Est. Revenue
            </CardTitle>
            <DollarSign className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              ₦{(stats.revenue / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top City
            </CardTitle>
            <MapPin className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.topCity}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Bill
            </CardTitle>
            <Calendar className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₦{stats.avgBill.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 30-day bar chart */}
      <Card>
        <CardHeader>
          <CardTitle>Leads – Last 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-1 h-48">
            {chart.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all"
                  style={{ height: `${Math.max(d.count * 12, 8)}px` }}
                >
                  {d.count > 0 && (
                    <span className="text-xs text-white font-bold block text-center mt-1">
                      {d.count}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground mt-2">
                  {d.day.split(" ")[1]}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}