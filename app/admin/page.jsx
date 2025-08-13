"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";

export default function AdminDashboard() {
  const { data: stats } = useConvexQuery(api.dashboard.getAdminStats);
  return (
    <div className="container mx-auto py-24 space-y-6">
      <h1 className="text-4xl gradient-title">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent>{stats?.users ?? 0}</CardContent></Card>
        <Card><CardHeader><CardTitle>Groups</CardTitle></CardHeader><CardContent>{stats?.groups ?? 0}</CardContent></Card>
        <Card><CardHeader><CardTitle>Expenses</CardTitle></CardHeader><CardContent>{stats?.expenses ?? 0}</CardContent></Card>
      </div>
    </div>
  );
}


