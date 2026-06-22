"use client";

import React from "react";
import dynamic from "next/dynamic";

const CatalogGrid = dynamic(() => import("@/components/ecommerce/CatalogGrid"), { ssr: false });

export default function EcommerceCatalogPage() {
  return <CatalogGrid />;
}
