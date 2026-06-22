"use client";

import React from "react";
import dynamic from "next/dynamic";

const OrdersPanel = dynamic(() => import("@/components/admin/OrdersPanel"), { ssr: false });

export default function AdminOrdersPage() {
  return <OrdersPanel />;
}
