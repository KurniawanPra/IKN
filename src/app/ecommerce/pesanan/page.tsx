"use client";

import React from "react";
import dynamic from "next/dynamic";

const OrdersPanel = dynamic(() => import("@/components/ecommerce/OrdersPanel"), { ssr: false });

export default function EcommerceOrdersPage() {
  return <OrdersPanel />;
}
