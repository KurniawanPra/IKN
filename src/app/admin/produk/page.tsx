"use client";

import React from "react";
import dynamic from "next/dynamic";

const ProductsPanel = dynamic(() => import("@/components/admin/ProductsPanel"), { ssr: false });

export default function AdminProductsPage() {
  return <ProductsPanel />;
}
